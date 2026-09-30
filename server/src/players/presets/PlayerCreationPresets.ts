// server/src/players/presets/PlayerCreationPresets.ts

export const STARTING_STATS = {
  strength: 5,
  baseStrength: 5,
  dexterity: 5,
  baseDexterity: 5,
  intelligence: 5,
  baseIntelligence: 5,
  charisma: 5,
  baseCharisma: 5,
  hp: 10,
  maxHp: 10,
  mp: 10,
  maxMp: 10,
  critChance: 0.05,
  critDamage: 0.25,
  critResistance: 0.0,
  damageReduction: 0.0,
  spellResistance: 0.0,
};

export const STARTING_SPAWN = {
  mapSlug: "tutorial",
  x: 10,
  y: 10,
};

export const STARTING_VITALS = {
  hunger: 100,
  hungerRate: 1,
  fatigue: 100,
  fatigueRate: 1,
  thirst: 100,
  thirstRate: 1,
};

export const STARTING_ITEMS: {slug: string, quantity: number}[] = [
  { slug: 'bread_scraps', quantity: 1 },
  { slug: 'water', quantity: 3 },
];

export const STARTING_CLASS = 'Novice';
export const STARTING_SKILLS: string[] = [];
export const STARTING_SPELLS: string[] = [];
