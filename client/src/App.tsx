// client/src/App.tsx

import "./App.css";
import {usePlayer} from "./context/PlayerContext";
import {GameCanvas} from "./components/game/GameCanvas";
import {HUD} from "./components/hud/HUD";
import {LootWindow} from "./components/game/LootWindow";
import {DialogWindow} from "./components/game/DialogWindow";
import {PlayerPanelsLayer} from "./components/player/PlayerPanelsLayer";

export default function App() {
  const {player} = usePlayer();
  if (!player) {
    return <div className="w-screen h-screen bg-black text-white flex items-center justify-center">Loading game...</div>;
  }

  return (
    <div className="w-screen h-screen bg-black relative overflow-hidden text-white">
      <GameCanvas/>
      <HUD/>
      <PlayerPanelsLayer/>
      <LootWindow/>
      <DialogWindow/>
    </div>
  );
}
