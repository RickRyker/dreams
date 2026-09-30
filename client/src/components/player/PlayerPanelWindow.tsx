import type { ReactNode } from "react";

interface PlayerPanelWindowProps {
  title: string;
  top: number;
  left: number;
  width: number;
  zIndex: number;
  isFocused: boolean;
  onFocus: () => void;
  onClose: () => void;
  children: ReactNode;
}

export function PlayerPanelWindow({
  title,
  top,
  left,
  width,
  zIndex,
  isFocused,
  onFocus,
  onClose,
  children,
}: PlayerPanelWindowProps) {
  return (
    <div
      role="dialog"
      aria-label={title}
      className={`absolute pointer-events-auto bg-black/90 border rounded shadow-xl overflow-hidden ${
        isFocused ? "border-cyan-400" : "border-gray-700"
      }`}
      style={{ top, left, width, zIndex }}
      onMouseDown={onFocus}
    >
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-700 bg-gray-950">
        <div className="text-xs font-semibold tracking-wide text-cyan-300">{title}</div>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-white text-sm"
          aria-label={`Close ${title}`}
        >
          ✕
        </button>
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
}
