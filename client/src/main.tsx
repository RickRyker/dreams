// src/main.tsx
import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import "./plain-utilities.css";
import AppRouter from "./routes";
import {AuthProvider} from "./context/AuthContext";
import {PlayerProvider} from "./context/PlayerContext";
import {GameStateProvider} from "./state/GameStateContext";
import {PlayerPanelsProvider} from "./state/PlayerPanelsContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <PlayerProvider>
        <GameStateProvider>
          <PlayerPanelsProvider>
            <AppRouter />
          </PlayerPanelsProvider>
        </GameStateProvider>
      </PlayerProvider>
    </AuthProvider>
  </StrictMode>
);
