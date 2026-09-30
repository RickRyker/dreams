# Quest Normalization Migration Plan

## 1. Overview

We are migrating from JSON-based quest requirements and rewards to fully normalized relational tables:

- Remove `QuestRequirements` and `QuestRewards` models
- Introduce per-type requirement and reward tables
- Introduce `QuestDependency` for prerequisite quests
- Keep `PlayerQuest` and `PlayerQuestVariable` as-is

## 2. Schema Changes

### Remove legacy models

- `QuestRequirements`
- `QuestRewards`

### Add new models

- `QuestRequirementLevel`
- `QuestRequirementItem`
- `QuestRequirementSkill`
- `QuestRequirementQuest`
- `QuestRewardItem`
- `QuestRewardSkill`
- `QuestRewardTitle`
- `QuestDependency`

### Update `Quest` model

- Remove:
    - `requirements QuestRequirements?`
    - `rewards QuestRewards?`
- Add:
    - `requirementLevels  QuestRequirementLevel[]`
    - `requirementItems   QuestRequirementItem[]`
    - `requirementSkills  QuestRequirementSkill[]`
    - `requirementQuests  QuestRequirementQuest[]`
    - `rewardItems        QuestRewardItem[]`
    - `rewardSkills       QuestRewardSkill[]`
    - `rewardTitles       QuestRewardTitle[]`
    - `dependencies       QuestDependency[]`

## 3. Data Migration Steps

1. **Export existing quest requirements and rewards**

    - Dump `QuestRequirements` and `QuestRewards` tables to JSON.
    - Shape:
        - `QuestRequirements`: `{ questId, level, items, skills, quests }`
        - `QuestRewards`: `{ questId, experience, gold, items, skills, titles }`

2. **Transform JSON into normalized rows**

    - For each `QuestRequirements` row:
        - Insert into `QuestRequirementLevel` (questId, level)
        - For each `items` entry: insert into `QuestRequirementItem`
        - For each `skills` entry: insert into `QuestRequirementSkill`
        - For each `quests` entry: insert into `QuestRequirementQuest` (questId, requiredQuestId)

    - For each `QuestRewards` row:
        - For each `items` entry: insert into `QuestRewardItem`
        - For each `skills` entry: insert into `QuestRewardSkill`
        - For each `titles` entry: insert into `QuestRewardTitle`

3. **Populate QuestDependency**

    - Option A: mirror `QuestRequirementQuest` into `QuestDependency`
    - Option B: author dependencies separately via content tools

4. **Drop legacy tables**

    - After verifying data migration:
        - Drop `QuestRequirements`
        - Drop `QuestRewards`

## 4. Application Code Changes

- Update Quest repositories to read/write normalized tables
- Update Quest services to:
    - Check requirements via normalized tables
    - Apply rewards via normalized tables
- Update Quest editor payload to send structured arrays instead of JSON blobs
- Update Quest validation engine to:
    - Validate referenced items/skills/quests exist
    - Detect circular dependencies via `QuestDependency`
- Update Quest graph renderer to use `QuestDependency` for edges

## 5. Rollout Strategy

1. Deploy schema changes with dual-read:
    - Read from both legacy JSON and normalized tables
2. Run data migration script
3. Switch application to read only from normalized tables
4. Remove legacy JSON fields and models
5. Monitor:
    - Quest availability
    - Quest completion
    - Error logs for missing references

