// infrastructure/lib/AuthStack.ts


import type {StackProps} from "aws-cdk-lib";
import {Stack} from "aws-cdk-lib";
import type {Construct} from "constructs";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import * as secretsmanager from "aws-cdk-lib/aws-secretsmanager";
import {makeApiLambda} from "./utils/makeApiLambda";

export class AuthStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // JWT secret
    const jwtSecret = new secretsmanager.Secret(this, "JwtSecret");

    // API Gateway
    const api = new apigw.RestApi(this, "AuthApi", {
      restApiName: "Auth Service",
    });

    const auth = api.root.addResource("auth");

    // Signup
    makeApiLambda(this, auth, "signup", "auth/signup.ts", "POST", {
      JWT_SECRET_ARN: jwtSecret.secretArn,
    });

    // Login
    makeApiLambda(this, auth, "login", "auth/login.ts", "POST", {
      JWT_SECRET_ARN: jwtSecret.secretArn,
    });

    // Refresh
    makeApiLambda(this, auth, "refresh", "auth/refresh.ts", "POST", {
      JWT_SECRET_ARN: jwtSecret.secretArn,
    });

    // Verify email
    makeApiLambda(this, auth, "verify", "auth/verify.ts", "POST");

    // Request password reset
    makeApiLambda(this, auth, "request-password-reset", "auth/requestPasswordReset.ts", "POST");

    // Reset password
    makeApiLambda(this, auth, "reset-password", "auth/resetPassword.ts", "POST");

    makeApiLambda(this, auth, "logout", "auth/logout.ts", "POST");
    makeApiLambda(this, auth, "resend-verification", "auth/resendVerification.ts", "POST");
    makeApiLambda(this, auth, "request-change-email", "auth/requestChangeEmail.ts", "POST");
    makeApiLambda(this, auth, "confirm-change-email", "auth/confirmChangeEmail.ts", "POST");
    makeApiLambda(this, auth, "change-password", "auth/changePassword.ts", "POST");
    makeApiLambda(this, auth, "delete-account", "auth/deleteAccount.ts", "POST");

    const openapi = auth.addResource("openapi.json");
    makeApiLambda(this, openapi, "openapi", "auth/openapiHandler.ts", "GET");

    // Grant secret read to log in + refresh only
    jwtSecret.grantRead(api.node.findChild("login") as any);
    jwtSecret.grantRead(api.node.findChild("refresh") as any);
  }
}
