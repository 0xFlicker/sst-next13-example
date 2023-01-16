import { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";
import { Database } from "./stacks/Database";
import { Api } from "./stacks/Api";
import { Web } from "./stacks/Web";

const config: SSTConfig = {
  config: () => ({
    name: "my-app",
    region: "us-east-1",
  }),
  stacks: async (app) => {
    app.setDefaultFunctionProps({
      runtime: "nodejs16.x",
    });
    app.stack(Database).stack(Api).stack(Web);
  },
};

export default config;
