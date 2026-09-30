// src/components/MfaModal.tsx
import React, { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (totp: string) => Promise<void>;
}

export function MfaModal({ open, onClose, onSubmit }: Props) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await onSubmit(code);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid code");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[10000]">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-6 rounded-lg shadow-lg w-80 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">MFA Required</h2>
        <p className="text-sm text-gray-300">
          Enter the 6‑digit code from your authenticator app.
        </p>

        {error && <div className="text-red-400 text-sm">{error}</div>}

        <input
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          placeholder="123456"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 border border-gray-600 rounded py-2 text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-2 rounded text-sm"
          >
            Verify
          </button>
        </div>
      </form>
    </div>
  );
}
