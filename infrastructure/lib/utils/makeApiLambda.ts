// infrastructure/lib/utils/makeApiLambda.ts

import { Construct } from "constructs";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import { makeLambda } from "./makeLambda";

export function makeApiLambda(
  scope: Construct,
  api: apigw.Resource,
  name: string,
  entry: string,
  method: string,
  environment: Record<string, string> = {}
) {
  const fn = makeLambda({
    scope,
    name,
    entry,
    environment,
  });

  api.addResource(name.toLowerCase()).addMethod(
    method,
    new apigw.LambdaIntegration(fn)
  );

  return fn;
}
