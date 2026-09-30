// client/src/routers.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SplashScreen from "./pages/SplashScreen";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import AccountProfile from "./pages/AccountProfile";
import ServerUnavailable from "./pages/ServerUnavailable";
import NotFound from "./pages/NotFound";

import CharacterSelect from "./pages/CharacterSelect";
import CharacterSheetPage from "./pages/CharacterSheetPage";

import SecurityPage from "./pages/SecurityPage";
import { ProtectedRoute } from "./components/ProtectedRoute";

import App from "./App";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify" element={<VerifyEmail />} />
        <Route path="/server-unavailable" element={<ServerUnavailable />} />

        {/* Protected routes */}
        <Route
          path="/characters"
          element={
            <ProtectedRoute>
              <CharacterSelect />
            </ProtectedRoute>
          }
        />

        <Route
          path="/character"
          element={
            <ProtectedRoute>
              <CharacterSheetPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/game"
          element={
            <ProtectedRoute>
              <App />
            </ProtectedRoute>
          }
        />

        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <AccountProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings/security"
          element={
            <ProtectedRoute>
              <SecurityPage />
            </ProtectedRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
