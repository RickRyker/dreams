// server/src/modules/classes/ClassesController.ts

import {NextFunction, Request, Response} from 'express';
import {ClassesService} from './ClassesService';
import {getParam} from "../../http/getParam";
import {AppError} from "../../errors/AppError";

export class ClassesController {
  constructor(private readonly service: ClassesService) {
    this.getClassById = this.getClassById.bind(this);
    this.listClasses = this.listClasses.bind(this);
    this.assignPlayerClass = this.assignPlayerClass.bind(this);
    this.getPlayerClass = this.getPlayerClass.bind(this);
    this.listPlayerClasses = this.listPlayerClasses.bind(this);
    this.removePlayerClass = this.removePlayerClass.bind(this);
  }

  async getClassById(req: Request, res: Response, next: NextFunction) {
    try {
      const classId: string | null = getParam(req.params.classId);
      if (!classId) return new AppError('Class ID is required', 400);
      res.json(await this.service.getClassById(classId));
    } catch (err) {
      next(err);
    }
  }

  async listClasses(_req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await this.service.listAllClasses());
    } catch (err) {
      next(err);
    }
  }

  async assignPlayerClass(req: Request, res: Response, next: NextFunction) {
    try {
      const playerId: string | null = getParam(req.params.playerId);
      if (!playerId) return new AppError('Player ID is required', 400);
      const classId: string | null = getParam(req.params.classId);
      if (!classId) return new AppError('Class ID is required', 400);
      res.json(await this.service.assignClass(playerId, classId));
    } catch (err) {
      next(err);
    }
  }

  async getPlayerClass(req: Request, res: Response, next: NextFunction) {
    try {
      const playerId: string | null = getParam(req.params.playerId);
      if (!playerId) return new AppError('Player ID is required', 400);
      res.json(await this.service.getPlayerClass(playerId));
    } catch (err) {
      next(err);
    }
  }

  async listPlayerClasses(req: Request, res: Response, next: NextFunction) {
    try {
      const playerId: string | null = getParam(req.params.playerId);
      if (!playerId) return new AppError('Player ID is required', 400);
      res.json(await this.service.listPlayerClasses(playerId));
    } catch (err) {
      next(err);
    }
  }

  async removePlayerClass(req: Request, res: Response, next: NextFunction) {
    try {
      const playerId: string | null = getParam(req.params.playerId);
      if (!playerId) return new AppError('Player ID is required', 400);
      const classId: string | null = getParam(req.params.classId);
      if (!classId) return new AppError('Class ID is required', 400);
      await this.service.removePlayerClass(playerId, classId);
      res.json({ success: true });
    } catch (err) {
      next(err);
    }
  }
}
