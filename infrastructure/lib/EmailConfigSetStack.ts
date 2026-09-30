// infrastructure/lib/EmailConfigSetStack.ts

import { Stack } from "aws-cdk-lib";
import type { Construct } from "constructs";
import * as ses from "aws-cdk-lib/aws-ses";

export class EmailConfigSetStack extends Stack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new ses.CfnConfigurationSet(this, "EmailConfigSet", {
      name: "GameEmailConfig",
    });
  }
}
