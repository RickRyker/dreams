// client/nest.config.ts

import path from "path";

module.exports = {
  webpack: (config: { resolve: { alias: { [x: string]: string; }; }; }) => {
    config.resolve.alias["@shared"] = path.resolve(__dirname, "../shared");
    return config;
  },
};
