// server/src/modules/variables/types.ts

import { PlayerVariable } from '@prisma/client';

export interface VariableDTO {
  id: string;
  playerId: string;
  name: string;
  value: string | null;
}

export interface SetVariableRequest {
  name: string;
  value: string | null;
}

