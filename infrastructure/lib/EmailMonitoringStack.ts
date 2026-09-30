// infrastructure/lib/EmailMonitoringStack.ts

import { Stack, Duration } from "aws-cdk-lib";
import type { Construct } from "constructs";
import * as cloudwatch from "aws-cdk-lib/aws-cloudwatch";
import * as cw_actions from "aws-cdk-lib/aws-cloudwatch-actions";
import * as sns from "aws-cdk-lib/aws-sns";
import * as snsSubs from "aws-cdk-lib/aws-sns-subscriptions";

export interface EmailMonitoringStackProps {
  notificationEmail: string;
  env: { region: string };
}

export class EmailMonitoringStack extends Stack {
  constructor(scope: Construct, id: string, props: EmailMonitoringStackProps) {
    super(scope, id, props);

    const topic = new sns.Topic(this, "SesAlertsTopic");
    topic.addSubscription(new snsSubs.EmailSubscription(props.notificationEmail));

    const bounceRate = new cloudwatch.Metric({
      namespace: "AWS/SES",
      metricName: "Reputation.BounceRate",
      statistic: "Average",
      period: Duration.minutes(5),
    });

    const complaintRate = new cloudwatch.Metric({
      namespace: "AWS/SES",
      metricName: "Reputation.ComplaintRate",
      statistic: "Average",
      period: Duration.minutes(5),
    });

    new cloudwatch.Alarm(this, "SesBounceRateAlarm", {
      metric: bounceRate,
      threshold: 0.05,
      evaluationPeriods: 3,
      datapointsToAlarm: 2,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
    }).addAlarmAction(new cw_actions.SnsAction(topic));

    new cloudwatch.Alarm(this, "SesComplaintRateAlarm", {
      metric: complaintRate,
      threshold: 0.01,
      evaluationPeriods: 3,
      datapointsToAlarm: 2,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
    }).addAlarmAction(new cw_actions.SnsAction(topic));
  }
}
