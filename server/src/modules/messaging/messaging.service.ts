// server/src/modules/messaging/messaging.service.ts

import { AppError } from "../../errors/AppError";
import { MessagingMapper } from "./messaging.mapper";
import { MessagingRepository } from "./messaging.repository";

export class MessagingService {
  constructor(
    private repository: MessagingRepository,
    private mapper: MessagingMapper,
  ) {}

  async sendMessage(data: {
    senderId: string;
    recipientId: string | null;
    content: string;
    messageType: string;
  }) {
    const patterns = await this.repository.listProfanityPatterns();
    const badWords: string[] = [];
    let filtered = data.content;

    for (const pattern of patterns) {
      const regex = new RegExp(pattern.pattern, "gi");
      if (regex.test(filtered)) {
        badWords.push(pattern.pattern);
        filtered = filtered.replace(regex, "***");
      }
    }

    const message = await this.repository.createMessage({
      senderId: data.senderId,
      recipientId: data.recipientId,
      content: filtered,
      messageType: data.messageType,
      isFiltered: badWords.length > 0,
      badWords,
    });

    return this.mapper.toMessageDto(message);
  }

  async getMessagesForPlayer(playerId: string) {
    return (await this.repository.listMessagesForPlayer(playerId)).map((message) => this.mapper.toMessageDto(message));
  }

  async moderateMessage(
    moderatorId: string,
    messageId: string,
    data: {
      isFlagged?: boolean;
      isFiltered?: boolean;
      moderationNote?: string;
    }
  ) {
    const msg = await this.repository.getMessageById(messageId);
    if (!msg) throw new AppError("Message not found", 404);

    return this.mapper.toMessageDto(
      await this.repository.updateMessage(messageId, {
        ...data,
        moderatorId,
      })
    );
  }
}
