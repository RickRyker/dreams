// client/src/components/AccountSecurityPanel.tsx
import React, { useEffect, useState } from "react";
import { AuthClient, type DeviceDto } from "../api/authClient";

interface Props {
  authClient: AuthClient;
}

export const AccountSecurityPanel: React.FC<Props> = ({ authClient }) => {
  const [mfaEnabled, setMfaEnabled] = useState<boolean | null>(null);
  const [devices, setDevices] = useState<DeviceDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [totpCode, setTotpCode] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const mfa = await authClient.getMfaStatus();
        setMfaEnabled(mfa.enabled);
        const { devices } = await authClient.getDevices();
        setDevices(devices);
      } finally {
        setLoading(false);
      }
    })();
  }, [authClient]);

  const handleInitMfa = async () => {
    const res = await authClient.initMfaEnable();
    setQrUrl(res.otpauth); // you’d convert this to a QR code in UI
  };

  const handleConfirmMfa = async () => {
    await authClient.confirmMfaEnable(totpCode);
    setMfaEnabled(true);
    setQrUrl(null);
    setTotpCode("");
  };

  const handleDisableMfa = async () => {
    await authClient.disableMfa();
    setMfaEnabled(false);
  };

  const handleRename = async (deviceId: string) => {
    const name = prompt("New device name?");
    if (!name) return;
    await authClient.renameDevice(deviceId, name);
    setDevices((prev) =>
      prev.map((d) => (d.id === deviceId ? { ...d, name } : d))
    );
  };

  const handleRevoke = async (deviceId: string) => {
    if (!confirm("Revoke this device? It may be signed out.")) return;
    await authClient.revokeDevice(deviceId);
    setDevices((prev) => prev.filter((d) => d.id !== deviceId));
  };

  const handleToggleTrusted = async (device: DeviceDto) => {
    const trusted = !device.trusted;
    await authClient.setDeviceTrusted(device.id, trusted);
    setDevices((prev) =>
      prev.map((d) => (d.id === device.id ? { ...d, trusted } : d))
    );
  };

  if (loading) return <div>Loading security settings...</div>;

  return (
    <div style={{ padding: 16 }}>
      <h2>Account Security</h2>

      <section style={{ marginBottom: 24 }}>
        <h3>MFA (TOTP)</h3>
        <p>Status: {mfaEnabled ? "Enabled" : "Disabled"}</p>

        {!mfaEnabled && (
          <>
            <button onClick={handleInitMfa}>Enable MFA</button>
            {qrUrl && (
              <div style={{ marginTop: 12 }}>
                <p>Scan this in your authenticator app:</p>
                <code>{qrUrl}</code>
                <div style={{ marginTop: 8 }}>
                  <input
                    placeholder="Enter 6-digit code"
                    value={totpCode}
                    onChange={(e) => setTotpCode(e.target.value)}
                  />
                  <button onClick={handleConfirmMfa}>Confirm</button>
                </div>
              </div>
            )}
          </>
        )}

        {mfaEnabled && (
          <button onClick={handleDisableMfa}>Disable MFA</button>
        )}
      </section>

      <section>
        <h3>Your Devices</h3>
        {devices.length === 0 && <p>No devices recorded yet.</p>}
        {devices.map((d) => (
          <div
            key={d.id}
            style={{
              border: "1px solid #444",
              padding: 8,
              marginBottom: 8,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div>
                <strong>{d.name}</strong>{" "}
                {d.trusted && <span>(Trusted)</span>}
              </div>
              <div style={{ fontSize: 12, opacity: 0.8 }}>
                IP: {d.lastIp} • Last used:{" "}
                {new Date(d.lastUsed).toLocaleString()}
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => handleRename(d.id)}>Rename</button>
              <button onClick={() => handleToggleTrusted(d)}>
                {d.trusted ? "Untrust" : "Trust"}
              </button>
              <button onClick={() => handleRevoke(d.id)}>Revoke</button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
