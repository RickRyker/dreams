// src/pages/CharacterSelect.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../config/api";
import { isServerUnavailableError } from "../api/authClient";
import { usePlayer } from "../context/PlayerContext";

interface PlayerListItem {
  id: string;
  name: string;
  level: number;
  class: string;
  isDefault: boolean;
}

export default function CharacterSelect() {
  const [players, setPlayers] = useState<PlayerListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setActivePlayer } = usePlayer();

  const launch = async (playerId: string) => {
    const hydrated = await setActivePlayer(playerId);
    if (!hydrated) {
      setError("Failed to load selected character. Please try again.");
      return;
    }
    navigate("/game");
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(apiUrl("/player/list"), {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to load characters (HTTP ${res.status})`);
        }

        const list = (await res.json()) as PlayerListItem[];

        // Auto-launch default
        const def = list.find((p) => p.isDefault);
        if (def) {
          await launch(def.id);
          return;
        }

        // Auto-launch if only one
        if (list.length === 1) {
          await launch(list[0].id);
          return;
        }

        setPlayers(list);
      } catch (err) {
        if (isServerUnavailableError(err)) {
          navigate("/server-unavailable");
          return;
        }

        setError(err instanceof Error ? err.message : "Failed to load characters");
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount only
  }, []);

  const setDefault = async (playerId: string) => {
    setPlayers((prev) =>
      prev.map((p) => ({
        ...p,
        isDefault: p.id === playerId,
      }))
    );
  };

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-black text-white">
        Loading characters...
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-[700px]">
        <h2 className="text-2xl font-bold mb-4 text-center">Select Character</h2>
        {error && <div className="mb-4 text-red-400 text-sm">{error}</div>}
        {players.length === 0 && !error && (
          <div className="mb-4 text-gray-300 text-sm">No characters found for this account.</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {players.map((p) => {
            return (
              <div
                key={p.id}
                className="bg-gray-800 border border-gray-700 rounded p-4"
              >
                <div className="text-lg font-bold">{p.name}</div>
                <div className="text-sm text-gray-300">
                  {p.class || "Adventurer"} • Lv {p.level ?? "?"}
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => {
                      launch(p.id).then();
                    }}
                    className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-1 rounded"
                  >
                    Play
                  </button>

                  <button
                    onClick={() => setDefault(p.id)}
                    className={`flex-1 border border-gray-600 rounded py-1 text-sm ${
                      p.isDefault
                        ? "bg-green-600 text-black"
                        : "hover:bg-gray-700"
                    }`}
                  >
                    {p.isDefault ? "Default" : "Set Default"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
