// infrastructure/lib/EmailEventsStack.ts

import { Stack } from "aws-cdk-lib";
import type { Construct } from "constructs";
import * as ses from "aws-cdk-lib/aws-ses";
import * as targets from "aws-cdk-lib/aws-events-targets";
import * as lambda from "aws-cdk-lib/aws-lambda";

export class EmailEventsStack extends Stack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const handler = new lambda.Function(this, "SesEventHandler", {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset("lambda/ses-events"),
    });

    new ses.CfnConfigurationSetEventDestination(this, "SesEventDestination", {
      configurationSetName: "GameEmailConfig",
      eventDestination: {
        name: "GameEmailEvents",
        enabled: true,
        matchingEventTypes: [
          "bounce",
          "complaint",
          "delivery",
          "reject",
          "open",
          "click",
        ],
        eventBridgeDestination: {
          eventBusArn: "arn:aws:events:us-east-1:123456789012:event-bus/default",
        },
      },
    });
  }
}
