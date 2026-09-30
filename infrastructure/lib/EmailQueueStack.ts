// infrastructure/lib/EmailQueueStack.ts

import { Stack, Duration } from "aws-cdk-lib";
import type { StackProps } from "aws-cdk-lib";
import type { Construct } from "constructs";

import * as sqs from "aws-cdk-lib/aws-sqs";
import * as lambdaEventSources from "aws-cdk-lib/aws-lambda-event-sources";
import * as iam from "aws-cdk-lib/aws-iam";

import { makeLambda } from "./utils/makeLambda";

export interface EmailQueueStackProps extends StackProps {
  readonly fromAddress: string;
  readonly sesSendPolicy: iam.ManagedPolicy;
}

export class EmailQueueStack extends Stack {
  public readonly queue: sqs.Queue;

  constructor(scope: Construct, id: string, props: EmailQueueStackProps) {
    super(scope, id, props);

    const dlq = new sqs.Queue(this, "EmailDlq", {
      retentionPeriod: Duration.days(14),
    });

    const queue = new sqs.Queue(this, "EmailQueue", {
      visibilityTimeout: Duration.seconds(30),
      retentionPeriod: Duration.days(4),
      deadLetterQueue: {
        queue: dlq,
        maxReceiveCount: 5,
      },
    });

    const worker = makeLambda({
      scope: this,
      name: "EmailWorker",
      entry: "email/worker.ts",
      timeoutSeconds: 30,
      memorySize: 512,
      environment: {
        SES_FROM_ADDRESS: props.fromAddress,
      },
    });

    // Attach SES send policy to worker
    worker.role?.addManagedPolicy(props.sesSendPolicy);

    // SQS → Lambda
    worker.addEventSource(
      new lambdaEventSources.SqsEventSource(queue, {
        batchSize: 10,
      })
    );

    queue.grantConsumeMessages(worker);

    this.queue = queue;
  }
}
