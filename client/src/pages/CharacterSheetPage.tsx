import { usePlayer } from "../context/PlayerContext";
import CharacterSheetPanel from "../components/CharacterSheetPanel";

export default function CharacterSheetPage() {
  const { player } = usePlayer();

  if (!player) {
    return (
      <div className="w-screen h-screen bg-black text-white flex items-center justify-center">
        Loading character...
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-black text-white p-6 overflow-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-cyan-400 tracking-wide">
        Character Sheet
      </h1>

      <CharacterSheetPanel />
    </div>
  );
}
