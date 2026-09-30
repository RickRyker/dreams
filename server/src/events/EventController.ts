// server/src/events/EventController.ts

import { Request, Response } from 'express';
import { EventService } from './EventService';

export class EventController {
  constructor(private service: EventService) {}

  list = async (req: Request, res: Response) => {
    res.json(await this.service.list());
  };

  get = async (req: Request, res: Response) => {
    const slug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;
    const event = await this.service.get(slug);
    if (!event) return res.status(404).json({ error: 'Not found' });
    res.json(event);
  };

  create = async (req: Request, res: Response) => {
    const event = await this.service.create(req.body);
    res.status(201).json(event);
  };

  update = async (req: Request, res: Response) => {
    const slug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;
    const event = await this.service.update(slug, req.body);
    res.json(event);
  };

  addReward = async (req: Request, res: Response) => {
    const slug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;
    const reward = await this.service.addReward(slug, req.body);
    res.status(201).json(reward);
  };

  deleteReward = async (req: Request, res: Response) => {
    const rewardId = Array.isArray(req.params.rewardId) ? req.params.rewardId[0] : req.params.rewardId;
    await this.service.deleteReward(rewardId);
    res.status(204).end();
  };
}
