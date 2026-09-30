#!/usr/bin/env node
// infrastructure/bin/app.ts

import "source-map-support/register";
import {App} from "aws-cdk-lib";
import {AuthStack} from "../lib/AuthStack";
import {EmailStack} from "../lib/EmailStack";
import {MaintenanceStack} from "../lib/MaintenanceStack";
import {EmailQueueStack} from "../lib/EmailQueueStack";
import {EmailMonitoringStack} from "../lib/EmailMonitoringStack";
import {EmailTemplatesStack} from "../lib/EmailTemplatesStack";

const app = new App();

new AuthStack(app, "AuthStack", {
  env: {
    // account: process.env.CDK_DEFAULT_ACCOUNT,
    region: "us-east-1"
  },
});

const emailStack = new EmailStack(app, "EmailStack", {
  hostedZoneId: "ZXXXXXXXXXXXX",
  hostedZoneName: "yourgame.com",
  fromAddress: "no-reply@yourgame.com",
});

new EmailMonitoringStack(app, "EmailMonitoringStack", {
  env: { region: "us-east-1" },
  notificationEmail: "ops@yourgame.com",
});

new EmailQueueStack(app, "EmailQueueStack", {
  fromAddress: emailStack.fromAddress,
  sesSendPolicy: emailStack.sesSendPolicy,
});

new EmailTemplatesStack(app, "EmailTemplatesStack", {
  env: { region: "us-east-1" },
});

new MaintenanceStack(app, "MaintenanceStack", {
  env: { region: "us-east-1" },
});

// const sesSecret = secretsmanager.Secret.fromSecretCompleteArn(
//   this,
//   "SesSecretRef",
//   emailStack.sesSecret.secretArn,
// );
//
// // example: request-password-reset Lambda
// makeApiLambda(authStack, auth, "request-password-reset", "auth/requestPasswordReset.ts", "POST", {
//   SES_SECRET_ARN: sesSecret.secretArn,
// });
//
// // grant read
// emailStack.sesSecret.grantRead(
//   auth.node.findChild("request-password-reset") as any
// );

// Later, when we need to deploy to multiple regions for failover.

/*
// Primary region (e.g., us-east-1)
const primaryDb = new DatabaseStack(app, "DatabaseStack-USEast1", {
  env: { region: "us-east-1" },
});

new AuthStack(app, "AuthStack-USEast1", {
  env: { region: "us-east-1" },
  databaseSecret: primaryDb.dbSecret,
  databaseEndpoint: primaryDb.cluster.clusterEndpoint.hostname,
});

// Secondary region (e.g., us-west-2) – assumes Aurora Global DB later
const secondaryDb = new DatabaseStack(app, "DatabaseStack-USWest2", {
  env: { region: "us-west-2" },
});

new AuthStack(app, "AuthStack-USWest2", {
  env: { region: "us-west-2" },
  databaseSecret: secondaryDb.dbSecret,
  databaseEndpoint: secondaryDb.cluster.clusterEndpoint.hostname,
});
*/
