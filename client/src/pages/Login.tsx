// src/pages/Login.tsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { MfaModal } from "../components/MfaModal";
import { isServerUnavailableError } from "../api/authClient";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mfaOpen, setMfaOpen] = useState(false);
  const [pendingCreds, setPendingCreds] = useState<{ email: string; password: string } | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      navigate("/characters");
    } catch (err: unknown) {
      if (isServerUnavailableError(err)) {
        navigate("/server-unavailable");
        return;
      }

      const msg = err instanceof Error ? err.message : "";
      if (msg.includes("MFA required")) {
        setPendingCreds({ email, password });
        setMfaOpen(true);
      } else {
        setError(msg);
      }
    }
  };

  const handleMfaSubmit = async (totp: string) => {
    if (!pendingCreds) return;
    await login(pendingCreds.email, pendingCreds.password, totp);
    navigate("/characters");
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={submit}
        className="bg-gray-900 p-8 rounded-lg shadow-lg w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        {error && <div className="text-red-400 text-sm">{error}</div>}

        <input
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-2 rounded"
        >
          Login
        </button>

        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <Link to="/signup" className="hover:text-cyan-400">
            Create account
          </Link>
          <Link to="/forgot-password" className="hover:text-cyan-400">
            Forgot password?
          </Link>
        </div>
      </form>

      <MfaModal
        open={mfaOpen}
        onClose={() => setMfaOpen(false)}
        onSubmit={handleMfaSubmit}
      />
    </div>
  );
}
