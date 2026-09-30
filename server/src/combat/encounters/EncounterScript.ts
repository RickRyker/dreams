// server/src/combat/encounters/EncounterScript.ts


export interface EncounterContext {
  engine: any;
  timestamp: number;
  bossId: string;
}

export interface EncounterPhase {
  id: string;
  startCondition: (ctx: EncounterContext) => boolean;
  onEnter?: (ctx: EncounterContext) => void;
  onTick?: (ctx: EncounterContext) => void;
}

export interface EncounterScript {
  id: string;
  phases: EncounterPhase[];
}
