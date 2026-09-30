// server/src/modules/npc/npc.service.ts

import { AppError } from "../../errors/AppError";
import { NpcMapper } from "./npc.mapper";
import { NpcRepository } from "./npc.repository";

export class NpcService {
  constructor(
    private repository: NpcRepository,
    private mapper: NpcMapper,
  ) {}

  async listNpcs() {
    return (await this.repository.listNpcs()).map((npc) => this.mapper.toNpcDto(npc));
  }

  async getNpcById(npcId: string) {
    const npc = await this.repository.getNpcById(npcId);
    if (!npc) throw new AppError("Npc not found", 404);
    return this.mapper.toNpcDto(npc);
  }

  async buyItem(playerId: string, npcId: string, itemId: string, quantity: number) {
    const shopItem = await this.repository.getShopItem(npcId, itemId);
    if (!shopItem) throw new AppError("Item not sold here", 404);

    const cost = (shopItem.buyPrice ?? 0) * quantity;
    await this.repository.decrementGold(playerId, cost);
    return this.repository.createInventoryItem(playerId, itemId, quantity);
  }

  async sellItem(playerId: string, inventoryItemId: string, quantity: number) {
    const inv = await this.repository.getInventoryItem(inventoryItemId);
    if (!inv || inv.playerId !== playerId) throw new AppError("Item not found", 404);
    if (inv.quantity < quantity) throw new AppError("Not enough quantity", 400);

    await this.repository.decrementInventory(playerId, inventoryItemId, quantity);
    return this.repository.incrementGold(playerId, quantity);
  }
}
