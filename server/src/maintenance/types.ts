// server/src/maintenance/types.ts


export type APIGatewayProxyEventV2 = {
  version: string;
  routeKey: string;
  rawPath: string;
  rawQueryString: string;
  headers: Record<string, string>;
  queryStringParameters?: Record<string, string>;
  pathParameters?: Record<string, string>;
  requestContext: {
    http: {
      method: string;
      path: string;
      protocol: string;
      sourceIp: string;
      userAgent: string;
    };
  };
  body?: string;
  isBase64Encoded: boolean;
};

export type APIGatewayProxyResultV2 = {
  statusCode: number;
  headers?: Record<string, string>;
  body?: string;
};

export type APIGatewayProxyHandlerV2 =
  (event: APIGatewayProxyEventV2) =>
    Promise<APIGatewayProxyResultV2>;
