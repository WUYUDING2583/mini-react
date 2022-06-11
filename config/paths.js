const path = require("path");

module.exports = {
  appBuild: path.resolve("build"),
  appIndexJs: path.resolve("src/index.js"),
  appPublic: path.resolve("public"),
  appHtml: path.resolve("public/index.html"),
  appPath: path.resolve("."),
  appPackage: path.resolve("package.json"),
};
