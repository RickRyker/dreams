// infrastructure/lib/utils/makeScheduledLambda.ts

import {Construct} from "constructs";
import {Duration} from "aws-cdk-lib";
import * as events from "aws-cdk-lib/aws-events";
import * as targets from "aws-cdk-lib/aws-events-targets";
import {makeLambda} from "./makeLambda";

export function makeScheduledLambda(
  scope: Construct,
  name: string,
  entry: string,
  schedule: Duration,
  environment: Record<string, string> = {}
) {
  const fn = makeLambda({
    scope,
    name,
    entry,
    environment,
  });

  new events.Rule(scope, `${name}Schedule`, {
    schedule: events.Schedule.rate(schedule),
    targets: [new targets.LambdaFunction(fn)],
  });

  return fn;
}
