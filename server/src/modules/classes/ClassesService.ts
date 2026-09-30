// server/src/modules/classes/ClassesService.ts

import {ClassesRepository} from './ClassesRepository';
import {ClassesAssembler} from "./ClassesAssembler";
import {ClassDomain, PlayerClassDomain} from './ClassTypes';
import {ClassDTO, PlayerClassDTO} from "@shared/zod/ClassSchema";
import {AppError} from '../../errors/AppError';

export class ClassesService {
  constructor(
    private readonly repo: ClassesRepository,
    private readonly assembler: ClassesAssembler,
  ) {}

  async assignClass(playerId: string, classId: string): Promise<PlayerClassDTO> {
    if (!playerId) throw new AppError('Player ID is required', 400);
    if (!classId) throw new AppError('Class ID is required', 400);

    const cls: ClassDomain | null = await this.repo.getClassById(classId);
    if (!cls) throw new AppError('Class not found', 404);

    const playerClassRow: PlayerClassDomain = await this.repo.assignClass(playerId, classId);

    const domain = {
      ...playerClassRow,
      class: cls,
    };

    return this.assembler.toPlayerClassDTO(domain);
  }

  async getClassById(classId: string): Promise<ClassDTO> {
    const cls: ClassDomain | null = await this.repo.getClassById(classId);
    if (!cls) throw new AppError('Class not found', 404);
    return this.assembler.toClassDTO(cls);
  }

  async getPlayerClass(playerId: string): Promise<PlayerClassDTO | null> {
    const domain: PlayerClassDomain | null = await this.repo.getPlayerClass(playerId);
    return domain ? this.assembler.toPlayerClassDTO(domain) : null;
  }

  async listAllClasses(): Promise<ClassDTO[]> {
    const domains: ClassDomain[] = await this.repo.listAllClasses();
    return domains.map((d: ClassDomain): ClassDTO => this.assembler.toClassDTO(d));
  }

  async listPlayerClasses(playerId: string): Promise<ClassDTO[]> {
    const rows: ClassDomain[] = await this.repo.listPlayerClasses(playerId);
    return rows.map((r: ClassDomain): ClassDTO => this.assembler.toClassDTO(r));
  }

  async removePlayerClass(playerId: string, classId: string): Promise<void> {
    await this.repo.removePlayerClass(playerId, classId);
  }
}
