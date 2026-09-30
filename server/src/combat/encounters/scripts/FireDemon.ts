// server/src/combat/encounters/scripts/FireDemon.ts


import {EncounterScript} from "../EncounterScript";

export const FireDemonEncounter: EncounterScript = {
  id: "fire_demon",
  phases: [
    {
      id: "PHASE_1",
      startCondition: ({engine, bossId}) =>
        engine.getStateStore().getState(bossId)!.hp > 0.7 * engine.getStateStore().getState(bossId)!.maxHp,
      onEnter: ({engine, bossId}) => {
        engine.enqueueEvent({
          type: "CAST_START",
          timestamp: Date.now(),
          sourceId: bossId,
          abilityId: "fireball",
          duration: 2000,
        });
      },
      onTick: ({engine, timestamp, bossId}) => {
        if (timestamp % 8000 < 50) {
          engine.enqueueEvent({
            type: "CAST_START",
            timestamp,
            sourceId: bossId,
            abilityId: "fireball",
            duration: 2000,
          });
        }
      },
    },
    {
      id: "PHASE_2",
      startCondition: ({engine, bossId}) =>
        engine.getStateStore().getState(bossId)!.hp <= 0.7 * engine.getStateStore().getState(bossId)!.maxHp &&
        engine.getStateStore().getState(bossId)!.hp > 0.3 * engine.getStateStore().getState(bossId)!.maxHp,
      onEnter: ({engine, bossId}) => {
        engine.enqueueEvent({
          type: "TELEGRAPH_START",
          timestamp: Date.now(),
          sourceId: bossId,
          effectId: "flame_wave",
          shape: "CIRCLE",
          radius: 8,
          duration: 3000,
        });
      },
    },
    {
      id: "ENRAGE",
      startCondition: ({engine, bossId}) =>
        engine.getStateStore().getState(bossId)!.hp <= 0.3 * engine.getStateStore().getState(bossId)!.maxHp,
      onEnter: ({engine, bossId}) => {
        engine.enqueueEvent({
          type: "APPLY_BUFF",
          timestamp: Date.now(),
          sourceId: bossId,
          targetId: bossId,
          effectType: "BUFF",
          stacks: 1,
          duration: 60000,
        });
      },
    },
  ],
};
