// server/src/guilds/validators/GuildSchemas.ts

import { z } from "zod";
import { GuildLogActionEnum } from "shared/types/GuildLogActionEnum";

export const guildActionBaseSchema = z.object({
  guildId: z.string().min(1),
  playerId: z.string().min(1),
});
export type GuildActionBaseDto = z.infer<typeof guildActionBaseSchema>;

// 1. Create guild
export const createGuildRequestSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  founderId: z.string().min(1),
});
export type CreateGuildRequestDto = z.infer<typeof createGuildRequestSchema>;

// 2. Get guild
export const getGuildRequestSchema = z.object({
  guildId: z.string().min(1),
});
export type GetGuildRequestDto = z.infer<typeof getGuildRequestSchema>;

// 3. Add member
export const addMemberRequestSchema = z.object({
  guildId: z.string().min(1),
  playerId: z.string().min(1),
  rankId: z.string().min(1),
});
export type AddMemberRequestDto = z.infer<typeof addMemberRequestSchema>;

// 4. Promote member
export const promoteMemberRequestSchema = z.object({
  guildId: z.string().min(1),
  memberId: z.string().min(1),
  newRankId: z.string().min(1),
  actorId: z.string().min(1),
});
export type PromoteMemberRequestDto = z.infer<typeof promoteMemberRequestSchema>;

// 5. Remove member
export const removeMemberRequestSchema = z.object({
  guildId: z.string().min(1),
  actorId: z.string().min(1),
  targetId: z.string().min(1),
});
export type RemoveMemberRequestDto = z.infer<typeof removeMemberRequestSchema>;

// 6. Donate item
export const donateItemRequestSchema = guildActionBaseSchema.extend({
  itemId: z.string().min(1),
});
export type DonateItemRequestDto = z.infer<typeof donateItemRequestSchema>;

// 7. Return item
export const returnItemRequestSchema = guildActionBaseSchema.extend({
  itemId: z.string().min(1),
});
export type ReturnItemRequestDto = z.infer<typeof returnItemRequestSchema>;

// 8. Borrow item
export const borrowItemRequestSchema = guildActionBaseSchema.extend({
  itemId: z.string().min(1),
});
export type BorrowItemRequestDto = z.infer<typeof borrowItemRequestSchema>;

// 9. Withdraw item
export const withdrawItemRequestSchema = guildActionBaseSchema.extend({
  itemId: z.string().min(1),
});
export type WithdrawItemRequestDto = z.infer<typeof withdrawItemRequestSchema>;

// 10. List logs
export const listGuildLogsRequestSchema = z.object({
  guildId: z.string().min(1),
  playerId: z.string().min(1),
});
export type ListGuildLogsRequestDto = z.infer<typeof listGuildLogsRequestSchema>;

// 11. Log action (internal use if needed)
export const logGuildActionRequestSchema = z.object({
  guildId: z.string().min(1),
  playerId: z.string().min(1),
  action: z.enum(GuildLogActionEnum),
  type: z.string().min(1),
  details: z.string().min(1),
});
export type LogGuildActionRequestDto = z.infer<typeof logGuildActionRequestSchema>;
