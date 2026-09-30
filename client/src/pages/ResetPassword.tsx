// src/pages/ResetPassword.tsx
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AuthClient, isServerUnavailableError } from "../api/authClient";
import { API_BASE_URL } from "../config/api";

const authClient = new AuthClient({ baseUrl: API_BASE_URL });

export default function ResetPassword() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get("token") || "";

  const [password, setPassword] = useState("");
  const [ok, setOk] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await authClient.resetPassword({ token, newPassword: password });
      setOk(true);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err: unknown) {
      if (isServerUnavailableError(err)) {
        navigate("/server-unavailable");
        return;
      }
      setError(err instanceof Error ? err.message : "Reset failed");
    }
  };

  if (!token) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-black text-white">
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
          Invalid or missing reset token.
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={submit}
        className="bg-gray-900 p-8 rounded-lg shadow-lg w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Reset Password</h2>

        {error && <div className="text-red-400 text-sm">{error}</div>}
        {ok && (
          <div className="text-green-400 text-sm">
            Password updated. Redirecting to login...
          </div>
        )}

        <input
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          placeholder="New password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-2 rounded"
        >
          Update password
        </button>
      </form>
    </div>
  );
}
