// client/src/config/constants.ts

/**
 * Global Constants and Configuration
 * Shared between various parts of the application.
 */
import { API_BASE_URL } from "./api";

// S3 Bucket URL for game assets
export const S3_BUCKET_URL = import.meta.env.VITE_S3_BUCKET || 'https://dreams.s3.amazonaws.com';

// API Configuration
export const API_BASE = API_BASE_URL;

// Tile Configuration
export const TILE_SIZE = 32;
export const VIEWPORT_TILES = 9;

// Other common constants can be added here
