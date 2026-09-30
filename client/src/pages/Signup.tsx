// src/pages/Signup.tsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthClient, isServerUnavailableError } from "../api/authClient";
import { API_BASE_URL } from "../config/api";

const authClient = new AuthClient({ baseUrl: API_BASE_URL });

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [ok, setOk] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await authClient.signup({ email, password });
      setOk(true);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err: unknown) {
      if (isServerUnavailableError(err)) {
        navigate("/server-unavailable");
        return;
      }
      setError(err instanceof Error ? err.message : "Signup failed");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={submit}
        className="bg-gray-900 p-8 rounded-lg shadow-lg w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Create Account</h2>

        {error && <div className="text-red-400 text-sm">{error}</div>}
        {ok && (
          <div className="text-green-400 text-sm">
            Account created. Check your email (if verification is enabled), then log in.
          </div>
        )}

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
          Sign up
        </button>

        <div className="text-xs text-gray-400 text-center mt-2">
          Already have an account?{" "}
          <Link to="/login" className="hover:text-cyan-400">
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
}
