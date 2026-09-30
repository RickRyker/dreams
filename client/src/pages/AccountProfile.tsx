import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AuthClient,
  type AccountProfileDto,
  isServerUnavailableError,
} from "../api/authClient";
import { API_BASE_URL } from "../config/api";

export default function AccountProfile() {
  const navigate = useNavigate();
  const authClient = useMemo(
    () =>
      new AuthClient({
        baseUrl: API_BASE_URL,
        getToken: () => localStorage.getItem("accessToken"),
      }),
    []
  );

  const [account, setAccount] = useState<AccountProfileDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [sendingVerification, setSendingVerification] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const profile = await authClient.getAccountProfile();
        setAccount(profile);
      } catch (err) {
        if (isServerUnavailableError(err)) {
          navigate("/server-unavailable");
          return;
        }
        setError(err instanceof Error ? err.message : "Failed to load account");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [authClient, navigate]);

  const requestVerification = async () => {
    if (!account) return;
    setError("");
    setNotice("");
    setSendingVerification(true);
    try {
      await authClient.requestVerification({ email: account.email });
      setNotice("Verification email sent.");
    } catch (err) {
      if (isServerUnavailableError(err)) {
        navigate("/server-unavailable");
        return;
      }
      setError(err instanceof Error ? err.message : "Verification request failed");
    } finally {
      setSendingVerification(false);
    }
  };

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-black text-white">
        Loading account...
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-[540px] space-y-4">
        <h2 className="text-2xl font-bold">Account Profile</h2>

        {error && <div className="text-red-400 text-sm">{error}</div>}
        {notice && <div className="text-green-400 text-sm">{notice}</div>}

        {account && (
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-gray-400">Account ID:</span> {account.id}
            </div>
            <div>
              <span className="text-gray-400">Email:</span> {account.email}
            </div>
            <div>
              <span className="text-gray-400">Verification:</span>{" "}
              {account.emailVerified ? "Verified" : "Unverified"}
            </div>
          </div>
        )}

        {account && !account.emailVerified && (
          <button
            onClick={requestVerification}
            disabled={sendingVerification}
            className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-60 text-black font-bold py-2 rounded"
          >
            {sendingVerification ? "Sending..." : "Send verification email"}
          </button>
        )}

        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <Link to="/settings/security" className="hover:text-cyan-400">
            Security settings
          </Link>
          <Link to="/characters" className="hover:text-cyan-400">
            Back to characters
          </Link>
        </div>
      </div>
    </div>
  );
}
