// client/src/components/hud/HUD.tsx

import { HpMpBars } from "./HpMpBars";
import { ExperienceBar } from "./ExperienceBar";
import { GoldDisplay } from "./GoldDisplay";
import { Hotbar } from "./Hotbar";
import { Minimap } from "./Minimap";
import { ActiveEffectsBar } from "./ActiveEffectsBar";
import { TargetFrame } from "./TargetFrame";
import { CombatLog } from "./CombatLog";
import { ChatUI } from "./ChatUI";
import { PlayerHudNav } from "./PlayerHudNav";

export function HUD() {
  return (
    <div className="pointer-events-none">
      <div className="absolute pointer-events-auto" style={{ top: 16, left: 16 }}>
        <HpMpBars />
      </div>

      <div
        className="absolute pointer-events-auto flex flex-col items-end gap-2"
        style={{ top: 16, right: 16 }}
      >
        <GoldDisplay />
        <Minimap />
      </div>

      <div
        className="absolute left-1/2 -translate-x-1/2 pointer-events-auto"
        style={{ top: 16 }}
      >
        <TargetFrame />
      </div>

      <div
        className="absolute left-1/2 -translate-x-1/2 pointer-events-auto"
        style={{ top: 80 }}
      >
        <PlayerHudNav />
      </div>

      <div className="absolute bottom-0 left-0 right-0 pointer-events-auto">
        <ExperienceBar />
      </div>

      <Hotbar />

      <div className="absolute pointer-events-auto" style={{ bottom: 112, left: 16 }}>
        <ActiveEffectsBar />
      </div>

      <div className="absolute pointer-events-auto" style={{ bottom: 16, left: 16 }}>
        <CombatLog />
      </div>

      <div className="absolute pointer-events-auto" style={{ bottom: 16, right: 16 }}>
        <ChatUI />
      </div>
    </div>
  );
}
