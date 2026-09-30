// server/src/quests/services/QuestValidationEngine.ts

import { QuestEditorCommand } from "../domain/QuestDomain";

export class QuestValidationEngine {
  static validate(payload: QuestEditorCommand) {
    if (!payload.name || payload.name.trim().length === 0) {
      throw new Error("Quest name cannot be empty");
    }

    if (!payload.slug || payload.slug.trim().length === 0) {
      throw new Error("Quest slug cannot be empty");
    }

    // Example: prevent circular requirements by slug
    const requiredSlugs = new Set(
      payload.requirementQuests?.map((q) => q.requiredQuestSlug) ?? []
    );

    if (requiredSlugs.has(payload.slug)) {
      throw new Error("Quest cannot require itself");
    }

    if (payload.requirementLevel !== undefined) {
      if (payload.requirementLevel < 1) {
        throw new Error("Required character level must be >= 1");
      }
    }

    // Add more semantic validations as needed
  }
}
