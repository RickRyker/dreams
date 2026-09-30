// infrastructure/lib/utils/makeLambda.ts

import * as lambdaNode from "aws-cdk-lib/aws-lambda-nodejs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Duration } from "aws-cdk-lib";
import * as path from "path";
import { Construct } from "constructs";

export interface MakeLambdaProps {
  scope: Construct;
  name: string;
  entry: string; // relative to server/src
  environment?: Record<string, string>;
  memorySize?: number;
  timeoutSeconds?: number;
}

export function makeLambda({
                             scope,
                             name,
                             entry,
                             environment = {},
                             memorySize = 512,
                             timeoutSeconds = 10,
                           }: MakeLambdaProps) {
  return new lambdaNode.NodejsFunction(scope, name, {
    entry: path.join(__dirname, "../../../server/src", entry),
    projectRoot: path.join(__dirname, "../../../server"),
    depsLockFilePath: path.join(__dirname, "../../../server/package-lock.json"),
    runtime: lambda.Runtime.NODEJS_20_X,
    memorySize,
    timeout: Duration.seconds(timeoutSeconds),
    bundling: {
      externalModules: [], // bundle EVERYTHING (Prisma, argon2, etc.)
    },
    environment,
  });
}
