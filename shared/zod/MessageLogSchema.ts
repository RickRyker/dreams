// shared/zod/MessageLogSchema.ts

import { z } from "zod";

export const MessageLogSchema = z.object({
  id: z.string(),
  senderId: z.string().nullable(),
  recipientId: z.string().nullable(),
  messageType: z.string(),
  content: z.string(),
  isFlagged: z.boolean(),
  isFiltered: z.boolean(),
  badWords: z.string(),
  moderatorId: z.string().nullable(),
  moderationNote: z.string().nullable(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
