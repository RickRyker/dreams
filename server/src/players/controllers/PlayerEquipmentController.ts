// server/src/players/controllers/PlayerEquipmentController.ts

import { Request, Response, NextFunction } from "express";
import { PlayerEquipmentService } from "../services/PlayerEquipmentService";
import { SlotType } from "@prisma/client";
import { EquipmentDto } from "shared";
import {getParam} from "../../http/getParam";

export class PlayerEquipmentController {
  constructor(private readonly service: PlayerEquipmentService) {}

  equip = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const playerId = getParam(req.params.playerId);
      const { slotType, itemId } = req.body;

      if (!playerId || !slotType || !itemId) {
        return res.status(403).json({ error: "BAD REQUEST" });
      }

      const dto = await this.service.equip(playerId, slotType as SlotType, itemId);
      res.status(200).json(dto);
    } catch (err) {
      next(err);
    }
  };

  unequip = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const equipmentId = getParam(req.params.equipmentId);
      if (!equipmentId) return res.status(403).json({ error: "BAD REQUEST" });

      await this.service.unequip(equipmentId);
      res.status(200).json({ ok: true });
    } catch (err) {
      next(err);
    }
  };

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const playerId = getParam(req.params.playerId);
      if (!playerId) return res.status(403).json({ error: "BAD REQUEST" });

      const list: EquipmentDto[] = await this.service.list(playerId);
      res.status(200).json(list);
    } catch (err) {
      next(err);
    }
  };
}
