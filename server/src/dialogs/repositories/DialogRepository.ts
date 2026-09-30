// server/src/dialogs/repositories/DialogRepository.ts

import {prisma} from "../../db/client";
import {DialogDisplayMode} from "@prisma/client";

export class DialogRepository {
  public prisma = prisma;

  async getDialog(dialogId: string) {
    return this.prisma.dialog.findUnique({
      where: { id: dialogId },
      include: {
        pages: {
          include: {
            parts: { include: { conditions: true } },
            actions: { include: { conditions: true } },
            links: { include: { conditions: true } },
          },
        },
      },
    });
  }

  async listDialogs() {
    return this.prisma.dialog.findMany({
      orderBy: { title: "asc" },
    });
  }

  async createDialog(data: {
    title: string;
    displayMode: string;
    chatBotId?: string | null;
  }) {
    const mode =
      Object.values(DialogDisplayMode).includes(data.displayMode as any)
        ? (data.displayMode as DialogDisplayMode)
        : DialogDisplayMode.OVERHEAD;

    return this.prisma.dialog.create({
      data: {
        title: data.title,
        displayMode: mode,
        chatBotId: data.chatBotId ?? null,
      },
    });
  }

  async updateDialog(dialogId: string, data: {
    title?: string;
    displayMode?: string;
    chatBotId?: string | null;
  }) {
    const mode =
      data.displayMode &&
      Object.values(DialogDisplayMode).includes(data.displayMode as any)
        ? (data.displayMode as DialogDisplayMode)
        : undefined;

    return this.prisma.dialog.update({
      where: { id: dialogId },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(mode !== undefined && { displayMode: mode }),
        ...(data.chatBotId !== undefined && { chatBotId: data.chatBotId }),
      },
    });
  }
  
  async deleteDialog(dialogId: string) {
    return prisma.dialog.delete({
      where: { id: dialogId },
    });
  }

  async getAllDialogsWithLinks() {
    return prisma.dialog.findMany({
      include: {
        pages: {
          include: {
            links: true,
          },
        },
      },
    });
  }

  async getPage(pageId: string) {
    return this.prisma.dialogPage.findUnique({
      where: { id: pageId },
    });
  }

  async createPage(dialogId: string, data: { sequence?: number; imageUrl?: string | null }) {
    return this.prisma.dialogPage.create({
      data: {
        dialogId,
        sequence: data.sequence ?? 0,
        imageUrl: data.imageUrl ?? null,
      },
    });
  }

  async updatePage(pageId: string, data: { sequence?: number; imageUrl?: string | null }) {
    return this.prisma.dialogPage.update({
      where: { id: pageId },
      data: {
        ...(data.sequence !== undefined && { sequence: data.sequence }),
        ...(data.imageUrl !== undefined && { imageUrl: data.imageUrl }),
      },
    });
  }

  async deletePage(pageId: string) {
    return this.prisma.dialogPage.delete({
      where: { id: pageId },
    });
  }

  async getPart(partId: string) {
    return this.prisma.dialogPart.findUnique({
      where: { id: partId },
    });
  }

  async createPart(pageId: string, data: { sequence?: number; text: string }) {
    return this.prisma.dialogPart.create({
      data: {
        pageId,
        sequence: data.sequence ?? 0,
        text: data.text,
      },
    });
  }

  async updatePart(partId: string, data: { sequence?: number; text?: string }) {
    return this.prisma.dialogPart.update({
      where: { id: partId },
      data: {
        ...(data.sequence !== undefined && { sequence: data.sequence }),
        ...(data.text !== undefined && { text: data.text }),
      },
    });
  }

  async deletePart(partId: string) {
    return this.prisma.dialogPart.delete({
      where: { id: partId },
    });
  }

  async getAction(actionId: string) {
    return this.prisma.dialogAction.findUnique({
      where: { id: actionId },
    });
  }

  async createAction(pageId: string, data: { sequence?: number; action: string }) {
    return this.prisma.dialogAction.create({
      data: {
        pageId,
        sequence: data.sequence ?? 0,
        action: data.action as any,
      },
    });
  }

  async updateAction(actionId: string, data: { sequence?: number; action?: string }) {
    return this.prisma.dialogAction.update({
      where: { id: actionId },
      data: {
        ...(data.sequence !== undefined && { sequence: data.sequence }),
        ...(data.action !== undefined && { action: data.action as any }),
      },
    });
  }

  async deleteAction(actionId: string) {
    return this.prisma.dialogAction.delete({
      where: { id: actionId },
    });
  }

  async getLink(linkId: string) {
    return this.prisma.dialogLink.findUnique({
      where: { id: linkId },
    });
  }

  async createLink(
    pageId: string,
    data: {
      sequence?: number | null;
      dialogId?: string | null;
      mapId?: string | null;
      x?: number | null;
      y?: number | null;
      leave?: boolean | null;
    },
  ) {
    return this.prisma.dialogLink.create({
      data: {
        pageId,
        sequence: data.sequence ?? 0,
        dialogId: data.dialogId ?? null,
        mapId: data.mapId ?? null,
        x: data.x ?? null,
        y: data.y ?? null,
        leave: data.leave ?? null,
      },
    });
  }

  async updateLink(
    linkId: string,
    data: {
      sequence?: number | null;
      dialogId?: string | null;
      mapId?: string | null;
      x?: number | null;
      y?: number | null;
      leave?: boolean | null;
    },
  ) {
    return this.prisma.dialogLink.update({
      where: { id: linkId },
      data: {
        ...(data.sequence !== undefined && { sequence: data.sequence ?? 0 }),
        ...(data.dialogId !== undefined && { dialogId: data.dialogId }),
        ...(data.mapId !== undefined && { mapId: data.mapId }),
        ...(data.x !== undefined && { x: data.x }),
        ...(data.y !== undefined && { y: data.y }),
        ...(data.leave !== undefined && { leave: data.leave }),
      },
    });
  }

  async deleteLink(linkId: string) {
    return this.prisma.dialogLink.delete({
      where: { id: linkId },
    });
  }

}
