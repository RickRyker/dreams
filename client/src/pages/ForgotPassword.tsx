// src/pages/ForgotPassword.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthClient, isServerUnavailableError } from "../api/authClient";
import { API_BASE_URL } from "../config/api";

const authClient = new AuthClient({ baseUrl: API_BASE_URL });

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await authClient.requestPasswordReset({ email });
      setSent(true);
    } catch (err) {
      if (isServerUnavailableError(err)) {
        navigate("/server-unavailable");
        return;
      }
      setError(err instanceof Error ? err.message : "Unable to request password reset");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={submit}
        className="bg-gray-900 p-8 rounded-lg shadow-lg w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Forgot Password</h2>

        {error && <div className="text-red-400 text-sm">{error}</div>}

        {sent && (
          <div className="text-green-400 text-sm">
            If that email exists, a reset link has been sent.
          </div>
        )}

        <input
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-2 rounded"
        >
          Send reset link
        </button>

        {sent && (
          <div className="text-xs text-gray-400 text-center mt-2">
            <Link to="/login" className="hover:text-cyan-400">
              Return to login
            </Link>
          </div>
        )}
      </form>
    </div>
  );
}
