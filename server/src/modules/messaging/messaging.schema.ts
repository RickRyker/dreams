// server/src/modules/messaging/messaging.schema.ts

import { z } from 'zod';

export const sendMessageSchema = z.object({
  senderId: z.string(),
  recipientId: z.string().nullable(), // null = global/system
  content: z.string().min(1),
  messageType: z.enum([
    'ADMIN',
    'BOT',
    'CHAT',
    'COMBAT',
    'ERROR',
    'NPC',
    'PLAYER',
    'QUEST',
    'SYSTEM',
    'WHISPER'
  ])
});

export const moderateMessageSchema = z.object({
  messageId: z.string(),
  isFlagged: z.boolean().optional(),
  isFiltered: z.boolean().optional(),
  moderationNote: z.string().optional()
});
