// server/src/players/domain/PlayerDomain.ts

export interface PlayerProfileDomain {
  id: string;
  name: string;
  isDefault: boolean;
  mapId: string | null;
  x: number;
  y: number;
  createdAt: number;
  updatedAt: number;
}

export interface PlayerListItemDomain {
  id: string;
  name: string;
  level: number;
  class: string;
  isDefault: boolean;
  createdAt: number;
}

export interface PlayerCreateCommand {
  accountId: string;
  name: string | null;
}

export interface PlayerUpdateCommand {
  name?: string;
  isDefault?: boolean;
  mapId?: string | null;
  x?: number;
  y?: number;
}
