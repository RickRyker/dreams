// server/src/services/PlayerService.ts

export class PlayerService {
    async create(data: {
        accountId: string;
        avatarId: string;
        name: string;
        mapId: string;
        recallLocationId: string;
    }) {
        return data;
    }

    async getByAccountId(accountId: string | undefined) {
        return { accountId };
    }

    async getByPlayerId(playerId: string) {
        return { playerId };
    }

    async getById(id: string) {
        return { id };
    }

    async movePlayer(playerId: string, mapId: string, x: number, y: number) {
        return { playerId, mapId, x, y };
    }

    async awardExperience(playerId: string, amount: number) {
        return { playerId, amount };
    }

    async giveItem(playerId: string, itemId: string, qty: number) {
        return { playerId, itemId, qty };
    }

    async sendMessage(playerId: string, content: string) {
        return { playerId, content };
    }

    async setVariable(playerId: string, key: string, value: string) {
        return { playerId, key, value };
    }

    async tickAllPlayers() {}
}
