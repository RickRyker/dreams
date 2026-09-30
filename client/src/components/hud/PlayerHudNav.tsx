import { useEffect } from "react";
import { usePlayerPanels } from "../../state/PlayerPanelsContext";
import { PLAYER_PANEL_DEFINITIONS } from "../../state/playerPanels";

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;

  const tag = target.tagName.toLowerCase();
  return (
    tag === "input" ||
    tag === "textarea" ||
    tag === "select" ||
    target.isContentEditable
  );
}

export function PlayerHudNav() {
  const { isPanelOpen, togglePanel } = usePlayerPanels();

  useEffect(() => {
    const shortcutMap = PLAYER_PANEL_DEFINITIONS.reduce<Record<string, (typeof PLAYER_PANEL_DEFINITIONS)[number]["id"]>>(
      (acc, panel) => {
        acc[panel.shortcut.toLowerCase()] = panel.id;
        return acc;
      },
      {}
    );

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (isTypingTarget(event.target)) return;

      const key = event.key.toLowerCase();
      const panelId = shortcutMap[key];
      if (!panelId) return;

      event.preventDefault();
      togglePanel(panelId);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [togglePanel]);

  return (
    <div className="bg-black/80 border border-gray-700 rounded px-2 py-1 flex items-center gap-1">
      {PLAYER_PANEL_DEFINITIONS.map((panel) => {
        const active = isPanelOpen(panel.id);

        return (
          <button
            key={panel.id}
            type="button"
            onClick={() => togglePanel(panel.id)}
            className={`px-2 py-1 text-xs rounded border transition-colors ${
              active
                ? "bg-cyan-700/40 border-cyan-300 text-cyan-100"
                : "bg-gray-900 border-gray-700 text-gray-300 hover:border-cyan-500 hover:text-white"
            }`}
            aria-pressed={active}
            aria-label={`${panel.label} (${panel.shortcut.toUpperCase()})`}
            title={`${panel.label} (${panel.shortcut.toUpperCase()})`}
          >
            <span>{panel.label}</span>
          </button>
        );
      })}
    </div>
  );
}
