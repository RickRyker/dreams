// client/src/api/authClient.ts

export interface AuthConfig {
  baseUrl: string; // e.g. https://api.example.com
  getToken?: () => string | null;
}

export interface AuthTokenClaims {
  accountId: string;
}

export interface AccountProfileDto {
  id: string;
  email: string;
  emailVerified: boolean;
  emailVerifiedAt: number | null;
  createdAt: number;
  updatedAt: number;
}

export interface DeviceDto {
  id: string;
  name: string;
  lastIp: string;
  lastUsed: string;
  createdAt: string;
  trusted: boolean;
}

export interface MfaStatusResponse {
  enabled: boolean;
}

export interface MfaEnableInitResponse {
  otpauth: string;
}

type ApiRequestErrorKind = "network" | "http" | "parse";

export class ApiRequestError extends Error {
  constructor(
    message: string,
    public readonly kind: ApiRequestErrorKind,
    public readonly status?: number
  ) {
    super(message);
    this.name = "ApiRequestError";
  }
}

export function isServerUnavailableError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  if (error instanceof ApiRequestError) {
    return error.kind === "network" || error.status === 503;
  }
  return error.message.includes("Failed to fetch");
}

async function request<T>(
  config: AuthConfig,
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(init.headers as Record<string, string> | undefined),
  };

  if (config.getToken) {
    const token = config.getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let res: Response;
  try {
    res = await fetch(`${config.baseUrl}${path}`, {
      ...init,
      headers,
    });
  } catch {
    throw new ApiRequestError("Server is unavailable", "network");
  }

  const text = await res.text();
  let data: unknown = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      if (!res.ok) {
        throw new ApiRequestError(text || `HTTP ${res.status}`, "http", res.status);
      }
      throw new ApiRequestError("Invalid JSON response", "parse", res.status);
    }
  }

  if (!res.ok) {
    const errorBody =
      data && typeof data === "object" ? (data as Record<string, unknown>) : null;
    const errorMessage = typeof errorBody?.error === "string" ? errorBody.error : `HTTP ${res.status}`;
    throw new ApiRequestError(errorMessage, "http", res.status);
  }

  return data as T;
}

async function requestWithRouteFallback<T>(
  config: AuthConfig,
  attempts: Array<{ path: string; init: RequestInit }>
): Promise<T> {
  let lastError: unknown;

  for (let index = 0; index < attempts.length; index++) {
    const attempt = attempts[index];
    try {
      return await request<T>(config, attempt.path, attempt.init);
    } catch (error) {
      const canTryNext =
        error instanceof ApiRequestError &&
        error.kind === "http" &&
        (error.status === 404 || error.status === 405) &&
        index < attempts.length - 1;

      if (canTryNext) {
        lastError = error;
        continue;
      }

      throw error;
    }
  }

  if (lastError instanceof Error) {
    throw lastError;
  }
  throw new Error("Request failed");
}

// Types (simplified to match OpenAPI)

export interface SignupRequest {
  email: string;
  password: string;
}
export interface LoginRequest {
  email: string;
  password: string;
}
export interface RefreshRequest {
  refreshToken: string;
}
export interface VerifyRequest {
  token: string;
}
export interface RequestPasswordResetRequest {
  email: string;
}
export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}
export interface LogoutRequest {
  refreshToken: string;
  all?: boolean;
}
export interface ResendVerificationRequest {
  email: string;
}
export interface RequestChangeEmailRequest {
  newEmail: string;
}
export interface ConfirmChangeEmailRequest {
  token: string;
}
export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

// Client

export class AuthClient {
  constructor(private config: AuthConfig) {}

  private decodeClaims(token: string): AuthTokenClaims {
    const parts = token.split(".");
    if (parts.length < 2) throw new Error("Invalid token");

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
    const payload = JSON.parse(atob(padded)) as { id?: string; };
    const accountId: string | undefined = payload.id;
    if (!accountId) throw new Error("Token payload missing account id");

    return { accountId };
  }

  getTokenClaims(token: string): AuthTokenClaims {
    return this.decodeClaims(token);
  }

  signup(body: SignupRequest) {
    return request<{ id: string; email: string }>(this.config, "/account/register", {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  async login(body: { email: string; password: string; totp?: string }) {
    const result = await request<{
      account: { id: string; email: string; };
      token: string;
    }>(this.config, "/account/login", {
      method: "POST",
      body: JSON.stringify(body),
    });
    const claims = this.decodeClaims(result.token);
    return {
      accessToken: result.token,
      account: result.account,
      accountId: claims.accountId,
    };
  }

  refresh(body: RefreshRequest) {
    return request<{ accessToken: string; refreshToken?: string }>(
      this.config,
      "/auth/refresh",
      { method: "POST", body: JSON.stringify(body) }
    );
  }

  verify(body: VerifyRequest) {
    return requestWithRouteFallback<{ success: boolean }>(this.config, [
      {
        path: "/verify/confirm",
        init: { method: "POST", body: JSON.stringify(body) },
      },
      {
        path: "/auth/verify",
        init: { method: "POST", body: JSON.stringify(body) },
      },
    ]);
  }

  requestPasswordReset(body: RequestPasswordResetRequest) {
    return requestWithRouteFallback<{ success: boolean }>(this.config, [
      {
        path: "/password/request",
        init: { method: "POST", body: JSON.stringify(body) },
      },
      {
        path: "/auth/request-password-reset",
        init: { method: "POST", body: JSON.stringify(body) },
      },
    ]);
  }

  resetPassword(body: ResetPasswordRequest) {
    return requestWithRouteFallback<{ success: boolean }>(this.config, [
      {
        path: "/password/perform",
        init: { method: "POST", body: JSON.stringify(body) },
      },
      {
        path: "/auth/reset-password",
        init: { method: "POST", body: JSON.stringify(body) },
      },
    ]);
  }

  logout(body: LogoutRequest) {
    return request<{ success: boolean }>(this.config, "/auth/logout", {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  resendVerification(body: ResendVerificationRequest) {
    return request<{ success: boolean }>(
      this.config,
      "/auth/resend-verification",
      { method: "POST", body: JSON.stringify(body) }
    );
  }

  requestVerification(body: ResendVerificationRequest) {
    return requestWithRouteFallback<{ success: boolean }>(this.config, [
      {
        path: "/verify/request",
        init: { method: "POST", body: JSON.stringify(body) },
      },
      {
        path: "/auth/resend-verification",
        init: { method: "POST", body: JSON.stringify(body) },
      },
    ]);
  }

  getAccountProfile() {
    return request<AccountProfileDto>(this.config, "/account/me", {
      method: "GET",
    });
  }

  requestChangeEmail(body: RequestChangeEmailRequest) {
    return request<{ success: boolean }>(
      this.config,
      "/auth/request-change-email",
      { method: "POST", body: JSON.stringify(body) }
    );
  }

  confirmChangeEmail(body: ConfirmChangeEmailRequest) {
    return request<{ success: boolean }>(
      this.config,
      "/auth/confirm-change-email",
      { method: "POST", body: JSON.stringify(body) }
    );
  }

  changePassword(body: ChangePasswordRequest) {
    return request<{ success: boolean }>(
      this.config,
      "/auth/change-password",
      { method: "POST", body: JSON.stringify(body) }
    );
  }

  deleteAccount() {
    return request<{ success: boolean }>(
      this.config,
      "/auth/delete-account",
      { method: "POST" }
    );
  }

  getOpenApi() {
    return request<Record<string, unknown>>(this.config, "/auth/openapi.json", { method: "GET" });
  }

  getMfaStatus() {
    return request<MfaStatusResponse>(this.config, "/auth/mfa/status", {
      method: "GET",
    });
  }

  initMfaEnable() {
    return request<MfaEnableInitResponse>(this.config, "/auth/mfa/enable", {
      method: "POST",
      body: JSON.stringify({ step: "init" }),
    });
  }

  confirmMfaEnable(token: string) {
    return request<{ success: boolean }>(this.config, "/auth/mfa/enable", {
      method: "POST",
      body: JSON.stringify({ step: "confirm", token }),
    });
  }

  disableMfa() {
    return request<{ success: boolean }>(this.config, "/auth/mfa/disable", {
      method: "POST",
    });
  }

  getDevices() {
    return request<{ devices: DeviceDto[] }>(this.config, "/auth/devices", {
      method: "GET",
    });
  }

  renameDevice(deviceId: string, name: string) {
    return request<{ success: boolean }>(
      this.config,
      "/auth/devices/rename",
      {
        method: "POST",
        body: JSON.stringify({ deviceId, name }),
      }
    );
  }

  revokeDevice(deviceId: string) {
    return request<{ success: boolean }>(
      this.config,
      "/auth/devices/revoke",
      {
        method: "POST",
        body: JSON.stringify({ deviceId }),
      }
    );
  }

  setDeviceTrusted(deviceId: string, trusted: boolean) {
    return request<{ success: boolean }>(
      this.config,
      "/auth/devices/trust",
      {
        method: "POST",
        body: JSON.stringify({ deviceId, trusted }),
      }
    );
  }

}
