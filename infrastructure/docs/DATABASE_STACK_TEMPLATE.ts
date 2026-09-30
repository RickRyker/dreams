// infrastructure/docs/DATABASE_STACK_TEMPLATE.ts

import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";

/**
 * DatabaseStack
 *
 * This stack is intentionally minimal while you are using Neon.
 * It exists ONLY to provide a clean migration path to Aurora later.
 *
 * When you migrate:
 *  - Add Aurora MySQL cluster here
 *  - Add Secrets Manager credentials here
 *  - Add VPC + subnets here (Aurora requires a VPC)
 *  - Export cluster endpoints for other stacks
 *
 * Until then, this stack remains empty.
 */

export class DatabaseStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Placeholder for future Aurora resources.
    // Neon is external, so CDK does not manage it.
  }
}
