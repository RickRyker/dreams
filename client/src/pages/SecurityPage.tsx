// src/pages/SecurityPage.tsx
import { AuthClient } from "../api/authClient";
import { AccountSecurityPanel } from "../components/AccountSecurityPanel";
import { API_BASE_URL } from "../config/api";
const authClient = new AuthClient({
  baseUrl: API_BASE_URL,
  getToken: () => localStorage.getItem("accessToken"),
});

export default function SecurityPage() {
  return (
    <div className="w-screen h-screen bg-black text-white flex items-center justify-center">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-[700px] max-h-[90vh] overflow-auto">
        <AccountSecurityPanel authClient={authClient} />
      </div>
    </div>
  );
}
