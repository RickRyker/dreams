// server/src/auth/openapiHandler.ts
//
// STUB Lambda handler. Wired up in infrastructure/lib/AuthStack.ts (CDK) to
// serve the auth API's OpenAPI document. Replace with a real spec/JSON
// response before deploying this Lambda for real traffic.

import { APIGatewayProxyHandlerV2 } from "./types";

export const handler: APIGatewayProxyHandlerV2 = async () => {
  return {
    statusCode: 501,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ error: "Not implemented: openapi" }),
  };
};
