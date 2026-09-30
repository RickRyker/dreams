// server/src/modules/pets/pets.service.ts

import { prisma } from "@prisma";
import { AppError } from '../../errors/AppError.js';

export const listPlayerPets = async (playerId: string) => {
  return prisma.playerPet.findMany({
    where: { playerId },
    include: {
      type: true
    }
  });
};

export const getPetById = async (petId: string) => {
  return prisma.playerPet.findUnique({
    where: { id: petId },
    include: {
      type: true
    }
  });
};

export const renamePet = async (playerId: string, petId: string, name: string) => {
  const pet = await getPetById(petId);
  if (!pet) throw new AppError('Pet not found', 404);
  if (pet.playerId !== playerId) throw new AppError('Forbidden', 403);

  return prisma.playerPet.update({
    where: { id: petId },
    data: { name }
  });
};

export const selectPet = async (playerId: string, petId: string) => {
  const pet = await getPetById(petId);
  if (!pet) throw new AppError('Pet not found', 404);
  if (pet.playerId !== playerId) throw new AppError('Forbidden', 403);

  // Unselect all other pets
  await prisma.playerPet.updateMany({
    where: { playerId },
    data: { isSelected: false }
  });

  // Select this one
  return prisma.playerPet.update({
    where: { id: petId },
    data: { isSelected: true }
  });
};

export const feedPet = async (playerId: string, petId: string, amount: number) => {
  const pet = await getPetById(petId);
  if (!pet) throw new AppError('Pet not found', 404);
  if (pet.playerId !== playerId) throw new AppError('Forbidden', 403);

  return prisma.playerPet.update({
    where: { id: petId },
    data: {
      hunger: Math.max(0, pet.hunger - amount)
    }
  });
};

export const hatchPet = async (playerId: string, petId: string) => {
  const pet = await getPetById(petId);
  if (!pet) throw new AppError('Pet not found', 404);
  if (pet.playerId !== playerId) throw new AppError('Forbidden', 403);

  if (!pet.isEgg) throw new AppError('Pet is not an egg', 400);
  if (new Date() < pet.hatchesAt) throw new AppError('Egg is not ready to hatch', 400);

  return prisma.playerPet.update({
    where: { id: petId },
    data: {
      isEgg: false,
      isJuvenile: true
    }
  });
};

export const updatePetMood = async (petId: string, hunger: number, loneliness: number) => {
  return prisma.playerPet.update({
    where: { id: petId },
    data: {
      hunger,
      loneliness
    }
  });
};
