// server/src/email/worker.ts
//
// STUB Lambda handler. This is wired up in
// infrastructure/lib/EmailQueueStack.ts (CDK) as the consumer of the
// EmailQueue SQS queue (SES send worker). Replace this stub with real
// SES-sending logic (using SES_FROM_ADDRESS from the environment and the
// message body/attributes on each SQS record) before deploying this Lambda
// for real traffic.

import { SQSHandler } from "./types";

export const handler: SQSHandler = async (event) => {
  for (const record of event.Records) {
    console.log("Not implemented: email worker received message", record.messageId);
  }
};
