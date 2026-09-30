// server/src/dialog/debugTypes.ts

export interface ConditionDebugEntry {
  conditionId: string;
  questId: string | null;
  variable: string | null;
  operator: string | null;
  rawValue: string | null;
  playerValue: any;
  convertedValue: any;
  result: boolean;
}

export interface ActionDebugEntry {
  actionId: string;
  actionType: string;
  executed: boolean;
  result?: any;
  skippedDueToConditions?: boolean;
}

export interface PartDebugEntry {
  partId: string;
  visible: boolean;
  conditions: ConditionDebugEntry[];
}

export interface LinkDebugEntry {
  linkId: string;
  visible: boolean;
  conditions: ConditionDebugEntry[];
}

export interface DialogDebugTrace {
  dialogId: string;
  pageSequence: number;
  parts: PartDebugEntry[];
  actions: ActionDebugEntry[];
  links: LinkDebugEntry[];
  variablesUsed: Record<string, any>;
}
