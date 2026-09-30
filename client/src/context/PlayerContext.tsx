// client/src/context/PlayerContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import type { PlayerDto } from "shared";
import { apiUrl } from "../config/api";

const PlayerContext = createContext<{
  player: PlayerDto | null;
  loading: boolean;
  error: string | null;
  refresh: (playerId?: string) => Promise<boolean>;
  setActivePlayer: (playerId: string) => Promise<boolean>;
}>({
  player: null,
  loading: false,
  error: null,
  refresh: async () => false,
  setActivePlayer: async () => false,
});

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [player, setPlayer] = useState<PlayerDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = async (playerId?: string): Promise<boolean> => {
    const id = playerId ?? localStorage.getItem("activePlayerId");
    if (!id) {
      setPlayer(null);
      setError(null);
      return false;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(apiUrl(`/player/full/${id}`), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
        },
      });

      if (!res.ok) {
        if (res.status === 401 || res.status === 403 || res.status === 404) {
          localStorage.removeItem("activePlayerId");
          setPlayer(null);
        }
        setError(`Failed to load player hydration (HTTP ${res.status})`);
        return false;
      }

      const data: PlayerDto = await res.json();
      setPlayer(data);
      return true;
    } catch {
      setPlayer(null);
      setError("Failed to load player hydration (network error)");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const setActivePlayer = async (playerId: string): Promise<boolean> => {
    localStorage.setItem("activePlayerId", playerId);
    return refresh(playerId);
  };

  useEffect(() => {
    refresh().then();
  }, []);

  return (
    <PlayerContext.Provider value={{ player, loading, error, refresh, setActivePlayer }}>
      {children}
    </PlayerContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components -- colocated hook for the provider above, standard context pattern
export function usePlayer() {
  return useContext(PlayerContext);
}
