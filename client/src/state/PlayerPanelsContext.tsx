import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { PLAYER_PANEL_IDS, type PlayerPanelId } from "./playerPanels";

type OpenPanelsState = Record<PlayerPanelId, boolean>;

interface PlayerPanelsContextValue {
  openPanels: OpenPanelsState;
  focusedPanel: PlayerPanelId | null;
  panelOrder: PlayerPanelId[];
  isPanelOpen: (panelId: PlayerPanelId) => boolean;
  openPanel: (panelId: PlayerPanelId) => void;
  closePanel: (panelId: PlayerPanelId) => void;
  togglePanel: (panelId: PlayerPanelId) => void;
  focusPanel: (panelId: PlayerPanelId) => void;
}

function createInitialOpenState(): OpenPanelsState {
  return PLAYER_PANEL_IDS.reduce<OpenPanelsState>((acc, id) => {
    acc[id] = false;
    return acc;
  }, {} as OpenPanelsState);
}

const PlayerPanelsContext = createContext<PlayerPanelsContextValue>({
  openPanels: createInitialOpenState(),
  focusedPanel: null,
  panelOrder: [],
  isPanelOpen: () => false,
  openPanel: () => {},
  closePanel: () => {},
  togglePanel: () => {},
  focusPanel: () => {},
});

export function PlayerPanelsProvider({ children }: { children: React.ReactNode }) {
  const [openPanels, setOpenPanels] = useState<OpenPanelsState>(createInitialOpenState);
  const [panelOrder, setPanelOrder] = useState<PlayerPanelId[]>([]);

  const focusedPanel = panelOrder.length > 0 ? panelOrder[panelOrder.length - 1] : null;

  const focusPanel = useCallback((panelId: PlayerPanelId) => {
    setPanelOrder((prev) => [...prev.filter((id) => id !== panelId), panelId]);
  }, []);

  const openPanel = useCallback(
    (panelId: PlayerPanelId) => {
      setOpenPanels((prev) => ({ ...prev, [panelId]: true }));
      focusPanel(panelId);
    },
    [focusPanel]
  );

  const closePanel = useCallback((panelId: PlayerPanelId) => {
    setOpenPanels((prev) => ({ ...prev, [panelId]: false }));
    setPanelOrder((prev) => prev.filter((id) => id !== panelId));
  }, []);

  const togglePanel = useCallback(
    (panelId: PlayerPanelId) => {
      if (openPanels[panelId]) {
        closePanel(panelId);
        return;
      }

      openPanel(panelId);
    },
    [closePanel, openPanel, openPanels]
  );

  const isPanelOpen = useCallback(
    (panelId: PlayerPanelId) => {
      return openPanels[panelId];
    },
    [openPanels]
  );

  const value = useMemo<PlayerPanelsContextValue>(
    () => ({
      openPanels,
      focusedPanel,
      panelOrder,
      isPanelOpen,
      openPanel,
      closePanel,
      togglePanel,
      focusPanel,
    }),
    [openPanels, focusedPanel, panelOrder, isPanelOpen, openPanel, closePanel, togglePanel, focusPanel]
  );

  return <PlayerPanelsContext.Provider value={value}>{children}</PlayerPanelsContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components -- colocated hook for the provider above, standard context pattern
export function usePlayerPanels() {
  return useContext(PlayerPanelsContext);
}
