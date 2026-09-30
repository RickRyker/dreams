// server/src/auth/login.ts
//
// STUB Lambda handler. This endpoint is wired up in
// infrastructure/lib/AuthStack.ts (CDK) but the real business logic still
// lives in the Express-based accounts module (see
// server/src/accounts/controllers/AuthController.ts and related routers).
// Replace this stub with a call into that logic (or a shared handler) before
// deploying this Lambda for real traffic.

import { APIGatewayProxyHandlerV2 } from "./types";

export const handler: APIGatewayProxyHandlerV2 = async () => {
  return {
    statusCode: 501,
    body: JSON.stringify({ error: "Not implemented: login" }),
  };
};