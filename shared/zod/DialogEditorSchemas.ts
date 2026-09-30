// shared/zod/DialogEditorSchemas.ts

import { z } from "zod";

export const DialogCreatePayloadSchema = z.object({
  editorId: z.string(), // playerId of editor
  title: z.string().min(1),
  displayMode: z.string(),
  chatBotId: z.string().nullable().optional(),
});

export const DialogUpdatePayloadSchema = z.object({
  editorId: z.string(),
  title: z.string().min(1).optional(),
  displayMode: z.string().optional(),
  chatBotId: z.string().nullable().optional(),
});

export const DialogEditorPartSchema = z.object({
  id: z.string().optional(),
  pageId: z.string().nullable().optional(),
  sequence: z.number(),
  text: z.string(),
});

export const DialogEditorActionSchema = z.object({
  id: z.string().optional(),
  pageId: z.string().nullable().optional(),
  sequence: z.number(),
  action: z.string(),
});

export const DialogEditorLinkSchema = z.object({
  id: z.string().optional(),
  pageId: z.string().nullable().optional(),
  sequence: z.number().nullable(),
  dialogId: z.string().nullable(),
  mapId: z.string().nullable(),
  x: z.number().nullable(),
  y: z.number().nullable(),
  leave: z.boolean().nullable(),
});

export const DialogEditorPageSchema = z.object({
  id: z.string().optional(),
  dialogId: z.string().optional(),
  sequence: z.number(),
  imageUrl: z.string().nullable().optional(),
  parts: z.array(DialogEditorPartSchema),
  actions: z.array(DialogEditorActionSchema),
  links: z.array(DialogEditorLinkSchema),
});

export const DialogEditorSchema = z.object({
  editorId: z.string(),
  dialogId: z.string().optional(),
  title: z.string(),
  displayMode: z.string(),
  chatBotId: z.string().nullable().optional(),
  pages: z.array(DialogEditorPageSchema),
});
