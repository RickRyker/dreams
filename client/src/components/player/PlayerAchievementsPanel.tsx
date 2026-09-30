import { usePlayer } from "../../context/PlayerContext";

interface PlayerAchievementView {
  id: string;
  name: string;
  description?: string;
  isCompleted?: boolean;
  completedAt?: number;
}

function completionLabel(achievement: PlayerAchievementView): string {
  if (!achievement.isCompleted) return "In progress";
  if (typeof achievement.completedAt !== "number") return "Completed";
  return `Completed ${new Date(achievement.completedAt).toLocaleDateString()}`;
}

export function PlayerAchievementsPanel() {
  const { player } = usePlayer();

  if (!player) {
    return (
      <div className="text-gray-400 p-4 bg-black border border-gray-700 rounded">
        Loading achievements...
      </div>
    );
  }

  const source = (player as { achievements?: unknown }).achievements;
  const achievements: PlayerAchievementView[] = Array.isArray(source)
    ? (source as PlayerAchievementView[])
    : [];

  if (!Array.isArray(source)) {
    return (
      <div className="bg-black text-white border border-gray-700 rounded p-4 w-[360px] shadow-lg">
        <h2 className="text-xl font-bold mb-3 text-amber-300 tracking-wide">Achievements</h2>
        <div className="text-gray-500 text-sm">
          Achievement data is not available for this character yet.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white border border-gray-700 rounded p-4 w-[360px] shadow-lg">
      <h2 className="text-xl font-bold mb-3 text-amber-300 tracking-wide">Achievements</h2>
      {achievements.length === 0 && (
        <div className="text-gray-600 text-xs">No achievements unlocked</div>
      )}
      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`p-2 border rounded ${
              achievement.isCompleted
                ? "bg-amber-900/20 border-amber-600"
                : "bg-gray-900 border-gray-700"
            }`}
          >
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium">{achievement.name}</div>
              <div
                className={`text-xs ${
                  achievement.isCompleted ? "text-amber-200" : "text-gray-400"
                }`}
              >
                {completionLabel(achievement)}
              </div>
            </div>
            {achievement.description && (
              <div className="text-xs text-gray-400 mt-1">{achievement.description}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
