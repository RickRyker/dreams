# Quest System Documentation

The **Quest System** manages narrative objectives and player progression through scriptable tasks.

## Quest Structure
- **Slug**: Unique string identifier (e.g., `the-tutorial-challenge`).
- **Owner**: Quests can be system-owned (global) or created by specific players (player-generated content).
- **Requirements**: Structured conditions including level prerequisites, required items (by slug), skill point thresholds, and completed dependencies.
- **Rewards**: Formalized payouts including experience, gold, specific item drops, skill point bonuses, and honorary titles.

## Progress Tracking
- **State Machine**: Quests transition through states: `NOT_STARTED`, `IN_PROGRESS`, and `COMPLETED`.
- **Quest Variables**: A key-value storage system attached to a player's quest progress. This allows for complex objectives like "Kill 10 Wolves" but incrementing a specific variable (`wolves_killed`).
- **Persistence**: Progress is saved per Player and is accessible via the `QuestService`.

## Specialized Unlocks
Quests often act as gates for advanced gameplay systems:
- **Arcane Academy**: Access to the magic school and spell learning is unlocked via the "Apprentice's Path" quest.
- **Gemwork**: The ability to cut and mount gems is unlocked via the "Lapidary's Discovery" quest line.
- **Engraving**: The "Master's Signature" quest rewards the player with an Engraving Pen and the knowledge to use it.

## Quest Editor
The game includes a `QuestEditorComponent.tsx` component for administrative use, allowing for the modification of quest templates, reward tables, and requirement logic without direct database manipulation.

