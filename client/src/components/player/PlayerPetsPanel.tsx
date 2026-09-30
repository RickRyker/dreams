import { usePlayer } from "../../context/PlayerContext";

interface PlayerPetView {
  id: string;
  name: string;
  species: string;
  level: number;
  createdAt: number;
}

function toDateLabel(timestamp: number): string {
  if (!Number.isFinite(timestamp)) return "Unknown";
  return new Date(timestamp).toLocaleDateString();
}

export function PlayerPetsPanel() {
  const { player } = usePlayer();

  if (!player) {
    return (
      <div className="text-gray-400 p-4 bg-black border border-gray-700 rounded">
        Loading pets...
      </div>
    );
  }

  const petsSource = (player as { pets?: unknown }).pets;
  const pets: PlayerPetView[] = Array.isArray(petsSource)
    ? (petsSource as PlayerPetView[])
    : [];

  return (
    <div className="bg-black text-white border border-gray-700 rounded p-4 w-[350px] shadow-lg">
      <h2 className="text-xl font-bold mb-3 text-pink-400 tracking-wide">Pets</h2>

      {pets.length === 0 && (
        <div className="text-gray-600 text-xs">No companion pets</div>
      )}

      <div className="space-y-2">
        {pets.map((pet) => (
          <div
            key={pet.id}
            className="p-2 bg-gray-900 border border-gray-700 rounded hover:border-pink-400"
          >
            <div className="flex justify-between">
              <span>{pet.name}</span>
              <span className="text-pink-300">Lv {pet.level}</span>
            </div>
            <div className="text-gray-400 text-xs mt-1">
              {pet.species} • Adopted {toDateLabel(pet.createdAt)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
