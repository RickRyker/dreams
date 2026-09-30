// server/src/email/types.ts

export type SQSRecord = {
  messageId: string;
  receiptHandle: string;
  body: string;
  attributes: Record<string, string>;
  messageAttributes: Record<string, unknown>;
  md5OfBody: string;
  eventSource: string;
  eventSourceARN: string;
  awsRegion: string;
};

export type SQSEvent = {
  Records: SQSRecord[];
};

export type SQSHandler = (event: SQSEvent) => Promise<void>;
