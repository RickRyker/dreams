// server/src/combat/abilities/types/AbilityTelegraphDefinition.ts


import {TelegraphShapeType} from "./TelegraphShapeType";

export interface AbilityTelegraphDefinition {
  shape: TelegraphShapeType;
  radius?: number;
  length?: number;
  width?: number;
  angle?: number;
  durationMs: number;
  color?: string;
}
