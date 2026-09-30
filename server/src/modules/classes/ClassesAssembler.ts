// server/src/modules/classes/ClassesAssembler.ts

import {ClassDomain, PlayerClassDomain} from './ClassTypes';
import {ClassDTO, PlayerClassDTO} from "@shared/zod/ClassSchema";

export class ClassesAssembler {
  toClassDTO(domain: ClassDomain): ClassDTO {
    return {
      id: domain.id,
      name: domain.name,
      description: domain.description,
      statGrowth: domain.statGrowth,
    };
  }

  toPlayerClassDTO(domain: PlayerClassDomain): PlayerClassDTO {
    return {
      id: domain.id,
      playerId: domain.playerId,
      classId: domain.classId,
      class: this.toClassDTO(domain.class),
    };
  }
}
