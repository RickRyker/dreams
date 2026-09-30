// server/src/modules/variables/variables.service.ts

import { prisma } from "@prisma";

export const listVariables = async (playerId: string) =>
  prisma.playerVariable.findMany({
    where: { playerId }
  });

export const getVariable = async (playerId: string, name: string) =>
  prisma.playerVariable.findUnique({
    where: { playerId_key: { playerId, key: name } }
  });

export const setVariable = async (playerId: string, name: string, value: string | null) =>
  prisma.playerVariable.upsert({
    where: { playerId_key: { playerId, key: name } },
    update: { value: value ?? "" },
    create: { playerId, key: name, value: value ?? "" }
  });

export const deleteVariable = async (playerId: string, name: string) =>
  prisma.playerVariable.delete({
    where: { playerId_key: { playerId, key: name } }
  });
