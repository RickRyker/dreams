// server/src/combat/controllers/CombatSnapshotController.ts

import {Request, Response} from "express";
import {CombatSnapshotService} from "../services/CombatSnapshotService";

export class CombatSnapshotController {
  constructor(
    private readonly service: CombatSnapshotService = new CombatSnapshotService()
  ) {}

  listSnapshots = async (req: Request, res: Response) => {
    const combatId: string = Array.isArray(req.params.combatId)
      ? req.params.combatId[0]
      : req.params.combatId;
    if (!combatId) return res.status(403).json({ error: "BAD REQUEST" });

    const snapshots = await this.service.listSnapshots(combatId);
    res.json(snapshots);
  };

  getSnapshot = async (req: Request, res: Response) => {
    const snapshotId: string = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;
    if (!snapshotId) return res.status(403).json({ error: "BAD REQUEST" });

    const snapshot = await this.service.getSnapshot(snapshotId);
    if (!snapshot) return res.status(404).send();
    res.json(snapshot);
  };

  deleteSnapshots = async (req: Request, res: Response) => {
    const combatId: string = Array.isArray(req.params.combatId)
      ? req.params.combatId[0]
      : req.params.combatId;
    if (!combatId) return res.status(403).json({ error: "BAD REQUEST" });

    await this.service.deleteSnapshots(combatId);
    res.status(204).send();
  };
}
