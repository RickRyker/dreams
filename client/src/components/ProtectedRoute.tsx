// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type {JSX} from "react";

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null; // or a loading screen

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
}
