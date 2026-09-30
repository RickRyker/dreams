// server/src/email/EmailWorker.ts

import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import pino from "pino";

// Minimal SQS types (safe, no aws-lambda dependency)
type SQSRecord = {
  body: string;
  attributes: {
    ApproximateReceiveCount?: string;
    [key: string]: string | undefined;
  };
};

type SQSEvent = {
  Records: SQSRecord[];
};

const logger = pino({
  level: process.env.LOG_LEVEL ?? "info",
  base: undefined,
});

const ses = new SESv2Client({});

type EmailJob = {
  to: string;
  subject: string;
  bodyText?: string;
  bodyHtml?: string;
  templateName?: string;
  templateData?: Record<string, unknown>;
};

const MAX_RETRIES = 3;

function parseJob(record: SQSRecord): EmailJob | null {
  try {
    return JSON.parse(record.body) as EmailJob;
  } catch (err) {
    logger.error({ err, record }, "Failed to parse SQS message body");
    return null;
  }
}

async function sendEmail(job: EmailJob) {
  const from = process.env.SES_FROM_ADDRESS;
  if (!from) {
    throw new Error("SES_FROM_ADDRESS is not set");
  }

  if (job.templateName) {
    await ses.send(
      new SendEmailCommand({
        FromEmailAddress: from,
        Destination: { ToAddresses: [job.to] },
        Content: {
          Template: {
            TemplateName: job.templateName,
            TemplateData: JSON.stringify(job.templateData ?? {}),
          },
        },
      })
    );
    return;
  }

  await ses.send(
    new SendEmailCommand({
      FromEmailAddress: from,
      Destination: { ToAddresses: [job.to] },
      Content: {
        Simple: {
          Subject: { Data: job.subject },
          Body: {
            Text: job.bodyText ? { Data: job.bodyText } : undefined,
            Html: job.bodyHtml ? { Data: job.bodyHtml } : undefined,
          },
        },
      },
    })
  );
}

export const handler = async (event: SQSEvent) => {
  for (const record of event.Records) {
    const job = parseJob(record);
    if (!job) {
      // malformed message → let it fail and go to DLQ
      continue;
    }

    const attempt =
      Number(record.attributes.ApproximateReceiveCount ?? "1") || 1;

    logger.info({ job, attempt }, "Processing email job");

    try {
      await sendEmail(job);
      logger.info({ job }, "Email sent successfully");
    } catch (err) {
      logger.error({ err, job, attempt }, "Failed to send email");

      if (attempt >= MAX_RETRIES) {
        // Let SQS move it to DLQ via maxReceiveCount
        logger.warn({ job, attempt }, "Max retries reached, letting DLQ handle");
        throw err;
      }

      // Re-throw to trigger retry
      throw err;
    }
  }
};
