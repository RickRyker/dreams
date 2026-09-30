import { usePlayer } from "../../context/PlayerContext";

interface JournalEntryView {
  id: string;
  title: string;
  content: string;
  createdAt?: number;
}

function toDateLabel(timestamp?: number): string {
  if (typeof timestamp !== "number" || !Number.isFinite(timestamp)) return "Unknown";
  return new Date(timestamp).toLocaleDateString();
}

export function PlayerJournalPanel() {
  const { player } = usePlayer();

  if (!player) {
    return (
      <div className="text-gray-400 p-4 bg-black border border-gray-700 rounded">
        Loading journal...
      </div>
    );
  }

  const source = (player as { journal?: unknown }).journal;
  const entries: JournalEntryView[] = Array.isArray(source)
    ? (source as JournalEntryView[])
    : [];

  if (!Array.isArray(source)) {
    return (
      <div className="bg-black text-white border border-gray-700 rounded p-4 w-[360px] shadow-lg">
        <h2 className="text-xl font-bold mb-3 text-violet-300 tracking-wide">Journal</h2>
        <div className="text-gray-500 text-sm">
          Journal data is not available for this character yet.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white border border-gray-700 rounded p-4 w-[360px] shadow-lg">
      <h2 className="text-xl font-bold mb-3 text-violet-300 tracking-wide">Journal</h2>
      {entries.length === 0 && <div className="text-gray-600 text-xs">No journal entries</div>}
      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
        {entries.map((entry) => (
          <div key={entry.id} className="p-2 bg-gray-900 border border-gray-700 rounded">
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium text-violet-200">{entry.title}</div>
              <div className="text-[11px] text-gray-500">{toDateLabel(entry.createdAt)}</div>
            </div>
            <div className="text-xs text-gray-300 mt-1 break-words">{entry.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
