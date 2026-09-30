const path = require("path");

module.exports = {
  settings: {
    "import/resolver": {
      alias: {
        map: [
          ["@shared", path.resolve(__dirname, "../shared")]
        ],
        extensions: [".ts", ".tsx", ".js", ".jsx"]
      }
    }
  }
};
