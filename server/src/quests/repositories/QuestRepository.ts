// server/src/quests/repositories/QuestRepository.ts

import {prisma} from "@prisma";
import type {Quest, QuestDependency} from "@prisma/client";
import {QuestWithRelations} from "../mappers/QuestMapper";

type QuestWithDependencies = Quest & {
  dependencies: (QuestDependency & { dependsOnQuest: Quest })[];
};

export class QuestRepository {
  async findById(id: string): Promise<QuestWithRelations | null> {
    return prisma.quest.findUnique({
      where: { id },
      include: {
        requirementLevels: true,
        requirementItems: true,
        requirementSkills: true,
        requirementQuests: {
          include: { requiredQuest: true },
        },
        rewardItems: true,
        rewardSkills: true,
        rewardTitles: true,
      },
    });
  }

  async findBySlug(slug: string): Promise<QuestWithRelations | null> {
    return prisma.quest.findUnique({
      where: { slug },
      include: {
        requirementLevels: true,
        requirementItems: true,
        requirementSkills: true,
        requirementQuests: {
          include: { requiredQuest: true },
        },
        rewardItems: true,
        rewardSkills: true,
        rewardTitles: true,
      },
    });
  }

  async search(query: any): Promise<Quest[]> {
    return prisma.quest.findMany({
      where: {
        name: query.name ? { contains: query.name, mode: "insensitive" } : undefined,
        slug: query.slug,
        createdById: query.createdById,
      },
      orderBy: { name: "asc" },
    });
  }

  async listAllWithDependencies(): Promise<QuestWithDependencies[]> {
    return prisma.quest.findMany({
      include: {
        dependencies: {
          include: {
            dependsOnQuest: true,
          },
        },
      },
    });
  }

  async create(data: any): Promise<Quest> {
    return prisma.quest.create({ data });
  }

  async update(id: string, data: any): Promise<Quest> {
    return prisma.quest.update({ where: { id }, data });
  }

  async delete(id: string): Promise<Quest> {
    return prisma.quest.delete({ where: { id } });
  }

}
