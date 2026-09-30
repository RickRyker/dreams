// server/src/combat/engines/CombatEngine.ts


import { AbilityDefinition, AbilityRegistry } from "../abilities";
import { CombatEventBus } from "../CombatEventBus";
import { CombatTimeline } from "../CombatTimeline";
import { EngineEntityId } from "../types/EngineCombatTypes";
import { CombatStateStore } from "../CombatStateStore";
import { CombatAIEngine } from "./CombatAIEngine";
import { EffectEngine } from "./EffectEngine";
import { BuffEngine } from "./BuffEngine";
import { DebuffEngine } from "./DebuffEngine";
import { DotHotEngine } from "./DotHotEngine";
import { ThreatEngine } from "./ThreatEngine";
import { CombatParticipantDto } from "shared";

export class CombatEngine {
  private readonly abilityRegistry = AbilityRegistry;
  private readonly bus: CombatEventBus = new CombatEventBus();
  private readonly timeline: CombatTimeline = new CombatTimeline();
  private readonly stateStore: CombatStateStore;

  private readonly effectEngine: EffectEngine;
  private readonly buffEngine: BuffEngine;
  private readonly debuffEngine: DebuffEngine;
  private readonly dotHotEngine: DotHotEngine;
  private readonly threatEngine: ThreatEngine;
  private readonly aiEngine: CombatAIEngine;
  private readonly playerEffects = new Map<EngineEntityId, any[]>();

  constructor(stateStore: CombatStateStore) {
    this.stateStore = stateStore;

    // Initialize subsystems
    this.effectEngine = new EffectEngine(this.bus, this.stateStore);
    this.buffEngine = new BuffEngine(this.bus, this.stateStore);
    this.debuffEngine = new DebuffEngine(this.bus, this.stateStore);
    this.dotHotEngine = new DotHotEngine(this.bus, this.stateStore);
    this.threatEngine = new ThreatEngine();
    this.aiEngine = new CombatAIEngine(
      this.bus,
      this.timeline,
      this.threatEngine,
      (id) => this.getParticipantPosition(id),
    );

    // Bind effect helpers AFTER initialization
    this.dealDamage = this.effectEngine.applyDamage.bind(this.effectEngine);
    this.heal = this.effectEngine.applyHeal.bind(this.effectEngine);
    this.applyShield = this.effectEngine.applyShield.bind(this.effectEngine);
    this.interrupt = this.effectEngine.interrupt.bind(this.effectEngine);
    this.applyBuff = this.effectEngine.applyBuff.bind(this.effectEngine);
    this.applyDebuff = this.effectEngine.applyDebuff.bind(this.effectEngine);
    this.applyDot = this.effectEngine.applyDot.bind(this.effectEngine);
    this.applyHot = this.effectEngine.applyHot.bind(this.effectEngine);
    this.generateThreat = this.effectEngine.generateThreat.bind(this.effectEngine);
  }

  // --- PUBLIC API ---

  getEventBus(): CombatEventBus {
    return this.bus;
  }

  getTimeline(): CombatTimeline {
    return this.timeline;
  }

  getAbilityDefinition(slug: string): AbilityDefinition | null {
    return this.abilityRegistry.get(slug)?.def ?? null;
  }

  getParticipantPosition(id: EngineEntityId): { x: number; y: number } | null {
    const p = this.stateStore.getParticipant(id);
    if (!p) return null;
    return { x: p.x, y: p.y };
  }

  hydrateParticipants(participants: CombatParticipantDto[]): void {
    for (const participant of participants) {
      this.stateStore.addParticipant({
        id: participant.id,
        x: participant.x,
        y: participant.y,
        hp: participant.hp,
        maxHp: participant.maxHp,
        shield: participant.shield ?? 0,
        interrupted: false,
        dead: false,
      });
    }
  }

  hydratePlayerEffects(playerId: EngineEntityId, effects: any[]): void {
    this.playerEffects.set(playerId, effects);
  }

  // --- EFFECT HELPERS (bound in constructor) ---
  dealDamage!: (targetId: string, amount: number) => void;
  heal!: (targetId: string, amount: number) => void;
  applyShield!: (targetId: string, amount: number) => void;
  interrupt!: (targetId: string) => void;
  applyBuff!: (targetId: string, buffId: string, durationMs: number) => void;
  applyDebuff!: (targetId: string, debuffId: string, durationMs: number) => void;
  applyDot!: (targetId: string, amount: number, durationMs: number, tickMs: number) => void;
  applyHot!: (targetId: string, amount: number, durationMs: number, tickMs: number) => void;
  generateThreat!: (targetId: string, amount: number) => void;

  // --- TICK LOOP ---
  tick(now: number): void {
    this.buffEngine.tick(now);
    this.debuffEngine.tick(now);
    this.dotHotEngine.tick(now);

    this.timeline.add({
      type: "TICK",
      timestamp: now,
    } as any);
  }
}
