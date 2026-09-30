import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AuthClient, isServerUnavailableError } from "../api/authClient";
import { API_BASE_URL } from "../config/api";

export default function VerifyEmail() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get("token") || "";
  const authClient = useMemo(() => new AuthClient({ baseUrl: API_BASE_URL }), []);

  const [status, setStatus] = useState<"idle" | "verifying" | "ok" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;

    const verify = async () => {
      setStatus("verifying");
      setError("");
      try {
        await authClient.verify({ token });
        setStatus("ok");
      } catch (err) {
        if (isServerUnavailableError(err)) {
          navigate("/server-unavailable");
          return;
        }
        setStatus("error");
        setError(err instanceof Error ? err.message : "Verification failed");
      }
    };

    verify();
  }, [authClient, navigate, token]);

  if (!token) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-black text-white">
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
          Invalid or missing verification token.
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center">Verify Email</h2>
        {status === "verifying" && <div className="text-sm">Verifying your email...</div>}
        {status === "ok" && (
          <div className="text-green-400 text-sm">
            Email verified successfully. You can now log in.
          </div>
        )}
        {status === "error" && <div className="text-red-400 text-sm">{error}</div>}

        <div className="text-xs text-gray-400 text-center mt-2">
          <Link to="/login" className="hover:text-cyan-400">
            Go to login
          </Link>
        </div>
      </div>
    </div>
  );
}
