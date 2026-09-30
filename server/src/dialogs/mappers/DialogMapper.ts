// server/src/dialogs/mappers/DialogMapper.ts

import {
  Dialog,
  DialogPage,
  DialogPart,
  DialogAction,
  DialogCondition,
  DialogLink,
} from "@prisma/client";

import {
  DialogDto,
  DialogPageDto,
  DialogPartDto,
  DialogActionDto,
  DialogConditionDto,
  DialogLinkDto,
} from "shared";

export class DialogMapper {
  static toDialogDto(model: Dialog): DialogDto {
    return {
      id: model.id,
      title: model.title,
      displayMode: model.displayMode,
      chatBotId: model.chatBotId,
      createdAt: model.createdAt.getTime(),
      updatedAt: model.updatedAt.getTime(),
    };
  }

  static toPageDto(model: DialogPage): DialogPageDto {
    return {
      id: model.id,
      dialogId: model.dialogId,
      sequence: model.sequence,
      imageUrl: model.imageUrl,
      createdAt: model.createdAt.getTime(),
      updatedAt: model.updatedAt.getTime(),
    };
  }

  static toPartDto(model: DialogPart): DialogPartDto {
    return {
      id: model.id,
      pageId: model.pageId,
      sequence: model.sequence,
      text: model.text,
      createdAt: model.createdAt.getTime(),
      updatedAt: model.updatedAt.getTime(),
    };
  }

  static toActionDto(model: DialogAction): DialogActionDto {
    return {
      id: model.id,
      pageId: model.pageId,
      sequence: model.sequence,
      action: model.action,
      questId: model.questId,
      variable1: model.variable1,
      variable2: model.variable2,
      text: model.text,
      numberAmt: model.numberAmt,
      floatAmt: model.floatAmt,
      slug: model.slug,
      skill: model.skill,
      mapId: model.mapId,
      x: model.x,
      y: model.y,
      message: model.message,
      sound: model.sound,
      music: model.music,
      cutscene: model.cutscene,
      createdAt: model.createdAt.getTime(),
      updatedAt: model.updatedAt.getTime(),
    };
  }

  static toConditionDto(model: DialogCondition): DialogConditionDto {
    return {
      id: model.id,
      partId: model.partId,
      actionId: model.actionId,
      linkId: model.linkId,
      questId: model.questId,
      variable: model.variable,
      operator: model.operator,
      value: model.value,
      createdAt: model.createdAt.getTime(),
      updatedAt: model.updatedAt.getTime(),
    };
  }

  static toLinkDto(model: DialogLink): DialogLinkDto {
    return {
      id: model.id,
      pageId: model.pageId,
      sequence: model.sequence,
      dialogId: model.dialogId,
      mapId: model.mapId,
      x: model.x,
      y: model.y,
      leave: model.leave,
      createdAt: model.createdAt.getTime(),
      updatedAt: model.updatedAt.getTime(),
    };
  }
}
