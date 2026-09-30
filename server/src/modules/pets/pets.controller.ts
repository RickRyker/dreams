// server/src/modules/pets/pets.controller.ts

import {
  listPlayerPets,
  getPetById,
  renamePet,
  selectPet,
  feedPet,
  hatchPet,
  updatePetMood
} from './pets.service.js';
import { AppError } from '../../errors/AppError.js';

export const listPetsController = async (playerId: string) => {
  return listPlayerPets(playerId);
};

export const getPetController = async (playerId: string, petId: string) => {
  const pet = await getPetById(petId);
  if (!pet) throw new AppError('Pet not found', 404);
  if (pet.playerId !== playerId) throw new AppError('Forbidden', 403);
  return pet;
};

export const renamePetController = async (playerId: string, petId: string, name: string) => {
  return renamePet(playerId, petId, name);
};

export const selectPetController = async (playerId: string, petId: string) => {
  return selectPet(playerId, petId);
};

export const feedPetController = async (playerId: string, petId: string, amount: number) => {
  return feedPet(playerId, petId, amount);
};

export const hatchPetController = async (playerId: string, petId: string) => {
  return hatchPet(playerId, petId);
};

export const updatePetMoodController = async (
  petId: string,
  hunger: number,
  loneliness: number
) => {
  return updatePetMood(petId, hunger, loneliness);
};
