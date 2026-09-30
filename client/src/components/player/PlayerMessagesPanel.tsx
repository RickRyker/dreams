import { usePlayer } from "../../context/PlayerContext";

interface PlayerMessageView {
  id: string;
  senderId: string | null;
  messageType: string;
  content: string;
  createdAt: number;
}

function toTimeLabel(timestamp: number): string {
  if (!Number.isFinite(timestamp)) return "Unknown";
  return new Date(timestamp).toLocaleString();
}

export function PlayerMessagesPanel() {
  const { player } = usePlayer();

  if (!player) {
    return (
      <div className="text-gray-400 p-4 bg-black border border-gray-700 rounded">
        Loading messages...
      </div>
    );
  }

  const messagesSource = (player as { messages?: unknown }).messages;
  const messages: PlayerMessageView[] = Array.isArray(messagesSource)
    ? (messagesSource as PlayerMessageView[])
    : [];

  return (
    <div className="bg-black text-white border border-gray-700 rounded p-4 w-[350px] shadow-lg">
      <h2 className="text-xl font-bold mb-3 text-cyan-300 tracking-wide">Messages</h2>

      {messages.length === 0 && (
        <div className="text-gray-600 text-xs">No messages</div>
      )}

      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
        {messages.map((message) => (
          <div
            key={message.id}
            className="p-2 bg-gray-900 border border-gray-700 rounded hover:border-cyan-400"
          >
            <div className="flex justify-between text-xs text-gray-400">
              <span>{message.messageType}</span>
              <span>{toTimeLabel(message.createdAt)}</span>
            </div>
            <div className="text-sm mt-1 break-words">{message.content}</div>
            <div className="text-xs text-gray-500 mt-1">
              From: {message.senderId ?? "System"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
