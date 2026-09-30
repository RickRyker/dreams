// server/src/chatbot/handleChatInput.ts

import {prisma} from '@prisma';
import {ChatBotEngine} from './chatBotEngine';

const chatBotEngine = new ChatBotEngine();

export async function handleDialogChatInput(params: {
  dialogId: string;
  userInput: string;
  playerId: string; // if you want per-player context later
}) {
  const dialog = await prisma.dialog.findUnique({
    where: { id: params.dialogId },
  });

  if (!dialog || !dialog.chatBotId) {
    return {
      reply: "This character doesn’t respond to free text.",
      matched: false,
    };
  }

  // Here you could also:
  // - Log the interaction
  // - Trigger DialogActions based on responseId
  // - Update quest variables, etc.

  return await chatBotEngine.evaluate({
    chatBotId: dialog.chatBotId,
    userInput: params.userInput,
  });
}
