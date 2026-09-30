// infrastructure/lib/EmailStack.ts

import { Stack } from "aws-cdk-lib";
import type { StackProps } from "aws-cdk-lib";
import type { Construct } from "constructs";

import * as ses from "aws-cdk-lib/aws-ses";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as iam from "aws-cdk-lib/aws-iam";

export interface EmailStackProps extends StackProps {
  readonly hostedZoneId: string;
  readonly hostedZoneName: string; // yourgame.com
  readonly fromAddress: string;    // no-reply@yourgame.com
}

export class EmailStack extends Stack {
  public readonly fromAddress: string;
  public readonly sesSendPolicy: iam.ManagedPolicy;

  constructor(scope: Construct, id: string, props: EmailStackProps) {
    super(scope, id, props);

    this.fromAddress = props.fromAddress;

    // Hosted zone
    const zone = route53.HostedZone.fromHostedZoneAttributes(this, "HostedZone", {
      hostedZoneId: props.hostedZoneId,
      zoneName: props.hostedZoneName,
    });

    // SES domain identity (creates DKIM + verification records automatically)
    new ses.EmailIdentity(this, "SesIdentity", {
      identity: ses.Identity.domain(props.hostedZoneName),
      dkimSigning: true,
    });

    // IAM policy for Lambda workers to send email
    this.sesSendPolicy = new iam.ManagedPolicy(this, "SesSendPolicy", {
      statements: [
        new iam.PolicyStatement({
          actions: ["ses:SendEmail", "ses:SendRawEmail"],
          resources: ["*"],
        }),
      ],
    });
  }
}
