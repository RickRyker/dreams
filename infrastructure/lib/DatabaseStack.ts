// infrastructure/lib/DatabaseStack.ts

import { Stack, Duration, RemovalPolicy } from "aws-cdk-lib";
import type { StackProps } from "aws-cdk-lib";
import type { Construct } from "constructs";
import * as rds from "aws-cdk-lib/aws-rds";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as secretsmanager from "aws-cdk-lib/aws-secretsmanager";

export interface DatabaseStackProps extends StackProps {
  readonly vpcCidr?: string;
}

export class DatabaseStack extends Stack {
  public readonly dbSecret: secretsmanager.ISecret;
  public readonly cluster: rds.DatabaseCluster;

  constructor(scope: Construct, id: string, props?: DatabaseStackProps) {
    super(scope, id, props);

    // VPC for Aurora
    const vpc = new ec2.Vpc(this, "DatabaseVpc", {
      maxAzs: 2,
      natGateways: 1,
      ipAddresses: ec2.IpAddresses.cidr(props?.vpcCidr ?? "10.0.0.0/16"),
    });

    // DB credentials in Secrets Manager
    const dbSecret = new secretsmanager.Secret(this, "AuroraCredentials", {
      generateSecretString: {
        secretStringTemplate: JSON.stringify({ username: "dbadmin" }),
        generateStringKey: "password",
        excludePunctuation: true,
      },
    });

    // Aurora MySQL cluster
    const cluster = new rds.DatabaseCluster(this, "AuroraCluster", {
      engine: rds.DatabaseClusterEngine.auroraMysql({
        version: rds.AuroraMysqlEngineVersion.VER_3_04_0,
      }),
      credentials: rds.Credentials.fromSecret(dbSecret),
      instances: 2,
      writer: rds.ClusterInstance.provisioned("WriterInstance", {
        publiclyAccessible: false,
      }),
      readers: [
        rds.ClusterInstance.provisioned("ReaderInstance", {
          publiclyAccessible: false,
        }),
      ],
      defaultDatabaseName: "game",
      instanceProps: {
        vpc,
        vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
      },
      backup: {
        retention: Duration.days(7),
      },
      removalPolicy: RemovalPolicy.SNAPSHOT,
    });

    this.dbSecret = dbSecret;
    this.cluster = cluster;
  }
}
