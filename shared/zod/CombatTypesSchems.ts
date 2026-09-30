// shared/zod/CombatTypesSchems.ts


import {z} from "zod";

// -----------------------------------------------------
// Entity snapshot DTO schema
// -----------------------------------------------------
export const EntitySnapshotDtoSchema = z.object({
  entityId: z.string(),
  hp: z.number(),
  maxHp: z.number(),
  shield: z.number(),
  buffs: z.array(z.string()),
  debuffs: z.array(z.string()),
  interrupted: z.boolean(),
});

// -----------------------------------------------------
// Combat event DTO schema
// -----------------------------------------------------
export const CombatEventDtoSchema = z.object({
  id: z.string(),
  combatId: z.string(),
  timestamp: z.number(),
  type: z.enum([
    "telegraph",
    "damage",
    "heal",
    "roundStart",
    "turnStart",
    "death",
    "cast",
    "interrupt",
    "THREAT_CHANGE",
  ]),
  participantId: z.string().nullable().optional(),
  label: z.string().optional(),
  value: z.number().nullable().optional(),
  telegraph: z.any().optional(),
  data: z.any().optional(),
});

// -----------------------------------------------------
// Combat log entry DTO schema
// -----------------------------------------------------
export const CombatLogEntryDtoSchema = z.object({
  id: z.string(),
  combatId: z.string(),
  seq: z.number(),
  createdAt: z.number(),
  type: z.string(),
  actorId: z.string().nullable().optional(),
  actorType: z.enum(["PLAYER", "MONSTER", "PET"]).nullable().optional(),
  targetId: z.string().nullable().optional(),
  message: z.string(),
  data: z.any().optional(),
});

// -----------------------------------------------------
// Combat participant DTO schema
// -----------------------------------------------------
export const CombatParticipantDtoSchema = z.object({
  id: z.string(),
  combatId: z.string(),
  playerId: z.string().nullable().optional(),
  petId: z.string().nullable().optional(),
  monsterId: z.string().nullable().optional(),
  name: z.string(),
  corpseName: z.string().nullable().optional(),
  x: z.number(),
  y: z.number(),
  hp: z.number(),
  maxHp: z.number(),
  shield: z.number().nullable().optional(),
});

// -----------------------------------------------------
// Combat resolution DTO schema
// -----------------------------------------------------
export const DamageResolutionDtoSchema = z.object({
  sourceId: z.string(),
  targetId: z.string(),
  amount: z.number(),
});

export const HealResolutionDtoSchema = z.object({
  sourceId: z.string(),
  targetId: z.string(),
  amount: z.number(),
});

export const ShieldResolutionDtoSchema = z.object({
  sourceId: z.string(),
  targetId: z.string(),
  amount: z.number(),
});

export const InterruptResolutionDtoSchema = z.object({
  targetId: z.string(),
});

export const CombatResolutionDtoSchema = z.object({
  damage: DamageResolutionDtoSchema.optional(),
  heal: HealResolutionDtoSchema.optional(),
  shield: ShieldResolutionDtoSchema.optional(),
  interrupt: InterruptResolutionDtoSchema.optional(),
});

// -----------------------------------------------------
// Combat snapshot DTO schema
// -----------------------------------------------------
export const CombatSnapshotDtoSchema = z.object({
  combatId: z.string(),
  timestamp: z.number(),
  round: z.number(),
  turnIndex: z.number(),
  activeParticipantId: z.string().nullable(),
  activeTurnId: z.string().nullable(),
  participants: z.array(EntitySnapshotDtoSchema),
  effects: z.array(z.any()),
  state: z.any().optional(),
});
