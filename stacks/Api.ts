import { use, StackContext, Api as ApiGateway } from "sst/constructs";
import { Database } from "./Database";

export function Api({ stack }: StackContext) {
  const table = use(Database);

  const api = new ApiGateway(stack, "api", {
    defaults: {
      function: {
        bind: [table],
      },
    },
    routes: {
      "POST /graphql": {
        type: "graphql",
        function: {
          handler: "packages/services/functions/graphql/graphql.handler",
        },
        pothos: {
          schema: "packages/services/functions/graphql/schema.ts",
          output: "packages/graphql/schema.graphql",
          commands: [
            "npx genql --output ./packages/graphql/genql --schema ./packages/graphql/schema.graphql --esm",
          ],
        },
      },
    },
  });

  stack.addOutputs({
    API: api.url,
  });

  return api;
}
