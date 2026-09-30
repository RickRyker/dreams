// server/src/modules/messaging/messaging.repository.ts

import { prisma } from "@prisma";
import { Prisma } from "@prisma/client";

export class MessagingRepository {
  async listProfanityPatterns(tx?: Prisma.TransactionClient) {
    const client = tx || prisma;
    return client.profanityPattern.findMany();
  }

  async createMessage(data: {
    senderId: string;
    recipientId: string | null;
    content: string;
    messageType: string;
    isFiltered: boolean;
    badWords: string[];
  }, tx?: Prisma.TransactionClient) {
    const client = tx || prisma;
    return client.messageLog.create({
      data: {
        senderId: data.senderId,
        recipientId: data.recipientId,
        content: data.content,
        messageType: data.messageType as any,
        isFiltered: data.isFiltered,
        badWords: data.badWords,
      },
    });
  }

  async listMessagesForPlayer(playerId: string, tx?: Prisma.TransactionClient) {
    const client = tx || prisma;
    return client.messageLog.findMany({
      where: {
        OR: [
          { recipientId: playerId },
          { recipientId: null },
        ],
      },
      include: {
        sender: true,
        recipient: true,
        moderator: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async getMessageById(messageId: string, tx?: Prisma.TransactionClient) {
    const client = tx || prisma;
    return client.messageLog.findUnique({ where: { id: messageId } });
  }

  async updateMessage(messageId: string, data: {
    isFlagged?: boolean;
    isFiltered?: boolean;
    moderationNote?: string;
    moderatorId: string;
  }, tx?: Prisma.TransactionClient) {
    const client = tx || prisma;
    return client.messageLog.update({
      where: { id: messageId },
      data,
    });
  }
}
