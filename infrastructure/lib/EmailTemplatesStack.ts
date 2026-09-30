// infrastructure/lib/EmailTemplatesStack.ts

import { Stack } from "aws-cdk-lib";
import type { Construct } from "constructs";
import * as ses from "aws-cdk-lib/aws-ses";

export interface EmailTemplatesStackProps {
  env: { region: string };
}

export class EmailTemplatesStack extends Stack {
  constructor(scope: Construct, id: string, props: EmailTemplatesStackProps) {
    super(scope, id, props);

    const templates = [
      {
        name: "VerificationEmail",
        subject: "Verify your account",
        text: "Hi {{email}}, verify your account here: {{verifyUrl}}",
        html: "<p>Hi {{email}},</p><p>Verify your account: <a href='{{verifyUrl}}'>Click here</a></p>",
      },
      {
        name: "PasswordResetEmail",
        subject: "Reset your password",
        text: "Hi {{email}}, reset your password here: {{resetUrl}}",
        html: "<p>Hi {{email}},</p><p>Reset your password: <a href='{{resetUrl}}'>Click here</a></p>",
      },
      {
        name: "WelcomeEmail",
        subject: "Welcome to Dreams of Nowhere Else and Beyond",
        text: "Hi {{email}}, welcome to the game! Visit {{loginUrl}} to begin.",
        html: "<p>Hi {{email}},</p><p>Welcome to <strong>Dreams of Nowhere Else and Beyond</strong>!</p><p><a href='{{loginUrl}}'>Start playing</a></p>",
      },
      {
        name: "NewDeviceEmail",
        subject: "A New Device Logged Into Your Account",
        text: "Hi {{email}}, a new device logged in: {{deviceInfo}}. If this wasn't you, reset your password: {{resetUrl}}",
        html: "<p>Hi {{email}},</p><p>A <strong>new device</strong> logged in: {{deviceInfo}}</p><p>If this wasn't you, <a href='{{resetUrl}}'>reset your password</a>.</p>",
      },
      {
        name: "SuspiciousLoginEmail",
        subject: "Suspicious Login Attempt Detected",
        text: "Hi {{email}}, we detected a suspicious login attempt. Details: {{details}}. Reset your password: {{resetUrl}}",
        html: "<p>Hi {{email}},</p><p>A <strong>suspicious login attempt</strong> occurred.</p><p>Details: {{details}}</p><p><a href='{{resetUrl}}'>Secure your account</a>.</p>",
      },
    ];

    for (const t of templates) {
      new ses.CfnTemplate(this, `${t.name}Template`, {
        template: {
          templateName: t.name,
          subjectPart: t.subject,
          textPart: t.text,
          htmlPart: t.html,
        },
      });
    }
  }
}
