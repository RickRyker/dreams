// server/src/players/services/PlayerInventoryService.ts


import {PlayerRepository} from "../repositories/PlayerRepository";
import {PlayerQuestRepository} from "../repositories/PlayerQuestRepository";
import {QuestRepository} from "../../quests/repositories/QuestRepository";
import {PlayerInventoryRepository} from "../repositories/PlayerInventoryRepository";

export class PlayerInventoryService {

  constructor(
    private readonly players: PlayerRepository = new PlayerRepository(),
    private readonly inventory: PlayerInventoryRepository = new PlayerInventoryRepository(),
  ) {}

  //

}
