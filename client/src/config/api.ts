// client/src/config/api.ts

const rawBase = import.meta.env.VITE_API_BASE_URL?.trim();

export const API_BASE_URL =
  rawBase && rawBase.length > 0 ? rawBase : "http://localhost:4000";

export function apiUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
}
