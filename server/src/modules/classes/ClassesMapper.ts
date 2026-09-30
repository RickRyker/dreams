// server/src/modules/classes/ClassesMapper.ts

import {ClassDomain, PlayerClassDomain} from './ClassTypes';

export class ClassesMapper {
  toClassDomain(row: any): ClassDomain {
    return {
      id: row.id,
      name: row.name,
      description: row.description,
      primaryStat: row.primaryStat,
      secondaryStat: row.secondaryStat,
      favoredWeapon: row.favoredWeapon,
      bonuses: row.bonuses,
      statGrowth: row.statGrowth,
      startingSpells: row.startingSpells,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
  }

  toPlayerClassDomain(row: any): PlayerClassDomain {
    return {
      id: row.id,
      playerId: row.playerId,
      classId: row.classId,
      class: this.toClassDomain(row.class),
    };
  }
}

