// server/src/email/EmailService.ts

import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import { buildPasswordResetEmail, buildVerificationEmail } from "./EmailTemplates";

const isProduction = process.env.NODE_ENV === "production";
const mode = process.env.EMAIL_MODE || "direct"; // "direct" | "queue"

export class EmailService {
  private from = process.env.SES_FROM_ADDRESS!;
  private region = process.env.AWS_REGION || "us-east-1";

  private ses = new SESv2Client({ region: this.region });
  private sqs = new SQSClient({ region: this.region });

  private queueUrl = process.env.EMAIL_QUEUE_URL;

  private async sendEmailMessage(email: string, msg: { subject: string; text: string; html: string }) {
    // --------------------------------------------------
    // DEV MODE: log instead of sending
    // --------------------------------------------------
    if (!isProduction) {
      console.log("[DEV EMAIL]", {
        to: email,
        subject: msg.subject,
        text: msg.text,
        html: msg.html,
      });
      return;
    }

    // --------------------------------------------------
    // QUEUE MODE: push job to SQS
    // --------------------------------------------------
    if (mode === "queue") {
      if (!this.queueUrl) throw new Error("EMAIL_QUEUE_URL not set");

      await this.sqs.send(
        new SendMessageCommand({
          QueueUrl: this.queueUrl,
          MessageBody: JSON.stringify({
            to: email,
            subject: msg.subject,
            bodyText: msg.text,
            bodyHtml: msg.html,
          }),
        })
      );
      return;
    }

    // --------------------------------------------------
    // DIRECT MODE: send via SESv2
    // --------------------------------------------------
    await this.ses.send(
      new SendEmailCommand({
        FromEmailAddress: this.from,
        Destination: { ToAddresses: [email] },
        Content: {
          Simple: {
            Subject: { Data: msg.subject },
            Body: {
              Text: { Data: msg.text },
              Html: { Data: msg.html },
            },
          },
        },
      })
    );
  }

  async sendVerificationEmail(email: string, token: string) {
    const msg = buildVerificationEmail(email, token);
    // await this.sendTemplateEmail(email, "VerificationEmail", msg);
    await this.sendEmailMessage(email, msg);
  }

  async sendPasswordResetEmail(email: string, token: string) {
    const msg = buildPasswordResetEmail(email, token);
    // await this.sendTemplateEmail(email, "PasswordResetEmail", msg);
    await this.sendEmailMessage(email, msg);
  }

  async sendWelcomeEmail(email: string, device: string): Promise<void> {
    // await this.sendTemplateEmail(email, "WelcomeEmail", msg);
    console.log("sendWelcomeEmail:", email, device);
    // When this email is sent
    // Immediately after successful account creation
    // After the user verifies their email (optional)
    // When onboarding flows complete
    // When a new character is created (optional flavor)
    // This is your “first impression” email.
  }

  async sendNewDeviceLoginEmail(email: string, device: string): Promise<void> {
    // await this.sendTemplateEmail(email, "NewDeviceLoginEmail", msg);
    console.log("sendNewDeviceLoginEmail:", email, device);
    // Triggered when:
    // A login occurs with a new browser fingerprint
    // A login occurs from a new IP address
    // A login occurs from a new platform (Windows → Android, etc.)
    // A login occurs from a new region (Indiana → California)
    // This is your “security awareness” email.
  }

  async sendSuspiciousLoginEmail(email: string, suspiciousDetails: any): Promise<void> {
    // await this.sendTemplateEmail(email, "SuspiciousLoginEmail", msg);
    console.log("sendSuspiciousLoginEmail:", email, suspiciousDetails);
    // Triggered when:
    // Multiple failed login attempts occur in a short time
    // A login attempt comes from a known malicious IP
    // A login attempt from a blocked region
    // A login attempt uses invalid or expired tokens
    // A login attempt triggers your rate limiter
    // A login attempt bypasses normal flows (e.g., suspicious OAuth callback)
    // This is your “account protection” email.
  }

}
