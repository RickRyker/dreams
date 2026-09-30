// server/src/modules/classes/ClassTypes.ts


export interface ClassDomain {
  id: string;
  name: string;
  description?: string | null;
  primaryStat?: string | null;
  secondaryStat?: string | null;
  favoredWeapon?: string | null;
  bonuses?: any;
  statGrowth?: any;
  startingSpells?: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface PlayerClassDomain {
  id: string;
  playerId: string;
  classId: string;
  class: ClassDomain;
}
