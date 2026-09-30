// server/src/modules/variables/variables.controller.ts

import {
  listVariables,
  getVariable,
  setVariable,
  deleteVariable
} from './variables.service.js';

export const listVariablesController = async (playerId: string) =>
  listVariables(playerId);

export const getVariableController = async (playerId: string, name: string) =>
  getVariable(playerId, name);

export const setVariableController = async (playerId: string, name: string, value: string | null) =>
  setVariable(playerId, name, value);

export const deleteVariableController = async (playerId: string, name: string) =>
  deleteVariable(playerId, name);
