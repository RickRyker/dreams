// client/src/components/hud/ChatUI.tsx
import {useState} from "react";
import {useGameState} from "../../state/GameStateContext";
import type {ChatMessage} from "../../state/gameStateTypes";

const CHANNELS = ["global", "local", "guild"] as const;
type Channel = (typeof CHANNELS)[number];

export function ChatUI() {
  const { state, addChat } = useGameState();
  const [input, setInput] = useState("");
  const [channel, setChannel] = useState<Channel>("global");

  const send = () => {
    if (!input.trim()) return;
    addChat({ channel, text: input.trim() });
    setInput("");
  };

  return (
    <div className="w-80 bg-black bg-opacity-80 border border-gray-700 rounded flex flex-col text-xs">
      <div className="flex gap-1 p-1 border-b border-gray-700">
        {CHANNELS.map((c) => (
          <button
            key={c}
            onClick={() => setChannel(c)}
            className={`px-2 py-0.5 rounded ${
              channel === c ? "bg-cyan-600 text-black" : "text-gray-300"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="flex-1 max-h-40 overflow-y-auto p-2 space-y-1 text-gray-200">
        {state.chat.map((m: ChatMessage) => (
          <div key={m.id}>
            <span className="text-gray-500">[{m.channel}]</span> {m.text}
          </div>
        ))}
      </div>

      <div className="border-t border-gray-700 flex">
        <input
          className="flex-1 bg-transparent px-2 py-1 text-white text-xs outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder={`Type ${channel} message...`}
        />
      </div>
    </div>
  );
}
