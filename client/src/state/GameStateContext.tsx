// client/src/state/GameStateContext.tsx
import React, {createContext, useContext, useEffect, useState} from "react";
import type {
  ActiveEffect,
  ChatMessage,
  GameState,
  LootItem,
  LootState,
  DialogState,
  TargetState,
} from "./gameStateTypes";
import { usePlayer } from "../context/PlayerContext";

const initialLoot: LootState = {
  isOpen: false,
  items: [],
};

const initialDialog: DialogState = {
  isOpen: false,
  npcName: "",
  text: "",
  options: [],
};

const initialState: GameState = {
  target: null,
  effects: [],
  combatLog: [],
  chat: [],
  loot: initialLoot,
  dialog: initialDialog,
};

const CHAT_STORAGE_PREFIX = "dreams.chat.v1";
const CHAT_LIMIT = 200;

interface GameStateContextValue {
  state: GameState;
  setTarget: (t: TargetState | null) => void;
  addEffect: (e: ActiveEffect) => void;
  removeEffect: (id: string) => void;
  addCombatLog: (text: string) => void;
  addChat: (msg: Omit<ChatMessage, "id">) => void;
  openLoot: (items: LootItem[]) => void;
  closeLoot: () => void;
  openDialog: (dialog: DialogState) => void;
  closeDialog: () => void;
}

const GameStateContext = createContext<GameStateContextValue | null>(null);

export function GameStateProvider({ children }: { children: React.ReactNode }) {
  const { player } = usePlayer();
  const [state, setState] = useState<GameState>(initialState);
  const activePlayerId = player?.id ?? localStorage.getItem("activePlayerId") ?? "anonymous";

  useEffect(() => {
    const storageKey = `${CHAT_STORAGE_PREFIX}:${activePlayerId}`;
    const raw = localStorage.getItem(storageKey);
    if (!raw) {
      setState((s) => ({ ...s, chat: [] }));
      return;
    }

    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        setState((s) => ({ ...s, chat: [] }));
        return;
      }

      const chat = parsed
        .filter((m): m is ChatMessage =>
          typeof m === "object" &&
          m !== null &&
          typeof m.id === "number" &&
          typeof m.text === "string" &&
          (m.channel === "system" || m.channel === "global" || m.channel === "local" || m.channel === "guild"),
        )
        .slice(-CHAT_LIMIT);

      setState((s) => ({ ...s, chat }));
    } catch {
      setState((s) => ({ ...s, chat: [] }));
    }
  }, [activePlayerId]);

  useEffect(() => {
    const storageKey = `${CHAT_STORAGE_PREFIX}:${activePlayerId}`;
    localStorage.setItem(storageKey, JSON.stringify(state.chat.slice(-CHAT_LIMIT)));
  }, [activePlayerId, state.chat]);

  // ---------------------------
  // TARGET
  // ---------------------------
  const setTarget = (t: TargetState | null) =>
    setState((s) => ({ ...s, target: t }));

  // ---------------------------
  // EFFECTS (BUFFS/DEBUFFS)
  // ---------------------------
  const addEffect = (e: ActiveEffect) =>
    setState((s) => ({ ...s, effects: [...s.effects, e] }));

  const removeEffect = (id: string) =>
    setState((s) => ({ ...s, effects: s.effects.filter((e) => e.id !== id) }));

  // Countdown engine
  useEffect(() => {
    const timer = setInterval(() => {
      setState((s) => {
        const updated = s.effects
          .map((e) => ({
            ...e,
            remainingSeconds: e.remainingSeconds - 1,
          }))
          .filter((e) => e.remainingSeconds > 0);

        return updated === s.effects ? s : { ...s, effects: updated };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // ---------------------------
  // COMBAT LOG
  // ---------------------------
  const addCombatLog = (text: string) =>
    setState((s: GameState) => ({
      ...s,
      combatLog: [
        ...s.combatLog,
        { id: Date.now(), text, timestamp: Date.now() },
      ].slice(-100),
    }));

  // ---------------------------
  // CHAT
  // ---------------------------
  const addChat = (msg: Omit<ChatMessage, "id">) =>
    setState((s: GameState) => ({
      ...s,
      chat: [...s.chat, { id: Date.now(), ...msg }].slice(-200),
    }));

  // ---------------------------
  // LOOT
  // ---------------------------
  const openLoot = (items: LootItem[]) =>
    setState((s: GameState) => ({
      ...s,
      loot: { isOpen: true, items },
    }));

  const closeLoot = () =>
    setState((s: GameState) => ({
      ...s,
      loot: { ...initialLoot },
    }));

  // ---------------------------
  // NPC DIALOG
  // ---------------------------
  const openDialog = (dialog: DialogState) =>
    setState((s: GameState) => ({
      ...s,
      dialog: { ...dialog, isOpen: true },
    }));

  const closeDialog = () =>
    setState((s: GameState) => ({
      ...s,
      dialog: { ...initialDialog },
    }));

  return (
    <GameStateContext.Provider
      value={{
        state,
        setTarget,
        addEffect,
        removeEffect,
        addCombatLog,
        addChat,
        openLoot,
        closeLoot,
        openDialog,
        closeDialog,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components -- colocated hook for the provider above, standard context pattern
export function useGameState() {
  const ctx = useContext(GameStateContext);
  if (!ctx) throw new Error("useGameState must be used within a GameStateProvider");
  return ctx;
}
