// server/src/guilds/helpers/ItemLocationHelper.ts

import { InventoryItem } from "@prisma/client";
import { ContainerType } from "shared";

/**
 * Expansion‑ready item location resolver.
 * Re‑uses shared ContainerType enum exactly as requested.
 */
export function getItemContainerType(item: InventoryItem): ContainerType | null {
  if (item.containerType) return item.containerType as ContainerType;
  if (item.guildTagId && !item.playerId) return "GUILD";
  if (item.playerId) return "PLAYER";
  return null;
}
