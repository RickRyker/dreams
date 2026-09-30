// server/src/combat/CombatEventBus.ts


import { EngineCombatEvent } from "./types/EngineCombatTypes";

type Listener<T extends EngineCombatEvent = EngineCombatEvent> = (event: T) => void;

export class CombatEventBus {
  private listeners = new Map<EngineCombatEvent["type"], Set<Listener>>();
  private legacyListeners = new Map<string, Set<(payload: any) => void>>();

  on<T extends EngineCombatEvent["type"]>(
    type: T,
    listener: Listener<Extract<EngineCombatEvent, { type: T }>>,
  ): void {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    this.listeners.get(type)!.add(listener as Listener);
  }

  off<T extends EngineCombatEvent["type"]>(
    type: T,
    listener: Listener<Extract<EngineCombatEvent, { type: T }>>,
  ): void {
    this.listeners.get(type)?.delete(listener as Listener);
  }

  emit(event: EngineCombatEvent): void {
    this.listeners.get(event.type)?.forEach((listener) => listener(event));
    this.legacyListeners.get(event.type)?.forEach((listener) => listener(event));
  }

  subscribe(eventName: string, listener: (payload: any) => void): void {
    if (!this.legacyListeners.has(eventName)) {
      this.legacyListeners.set(eventName, new Set());
    }
    this.legacyListeners.get(eventName)!.add(listener);
  }

  unsubscribe(eventName: string, listener: (payload: any) => void): void {
    this.legacyListeners.get(eventName)?.delete(listener);
  }

  publish(eventName: string, payload: any): void {
    this.legacyListeners.get(eventName)?.forEach((listener) => listener(payload));
  }

  emitCombatEvent(event: EngineCombatEvent): void {
    this.emit(event);
  }

  emitResolution(event: EngineCombatEvent): void {
    this.emit(event);
  }

  emitSnapshot(event: EngineCombatEvent): void {
    this.emit(event);
  }
}
