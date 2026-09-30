# Pets and Mounts Documentation

**Pets** are loyal companions that player a significant role in both combat and exploration.

## Pet Types and Combat
Each pet belongs to a `PetType` which defines its base stats and behavior.
- **Mêlée**: High strength and HP, attaks adjacent targets.
- **Ranged**: Lower HP, can attack from a distance of up to 3 tiles.
- **Magic**: Specialized in elemental or arcane attacks.

## Progression and Stats
- **Juvenile State**: New pets may have the `isJuvenile` flag, indicating they are in a younger, weaker state of growth.
- **Default Pets**: Specific species (e.g., Cat, Dog, Pig, Rabbit, Rat, Turtle) are flagged as `defaultPet` and are available for new characters.
- **Visuals**: Each `PetType` has a `spriteImage` path used by the frontend for dynamic rendering. 

Pets participate in the 16x16 combat grid alongside their owners. 
They have their own HP and can be permanently lost if they fall in battle and their corpse is not recovered (depending on world settings).

## Mounts
Certain pet types are flagged as `isMountable`.
- **Cavalier Bonus**: Players with the `Cavalier` class receive specific bonuses when using a mountable pet.
- **Mechanics**: When mounted, the player and pet occupy the same tile on the combat grid, combining their movement actions while maintaining separate attack capabilities.

## Life Cycle: Eggs and Sacrifice:
- **Pet Eggs**: Pets begin their life as eggs. Eggs have a `hatchesAt` timestamp and will reveal their species once the time expires.
- **Sacrifice**: Through the `CraftingService`, players can sacrifice specific combinations of grown pets to obtain rare or powerful **Pet Eggs**. This ritual requires the player to be at a specific sacred location and record the `PETS_SACRIFICED` event. This is often used to "tier up" companions.
