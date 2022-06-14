const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const chalk = require("chalk");

const webpackConfig = require("../config/webpack.config");
const checkRequiredFiles = require("../modules/dev-utils/checkRequiredFiles");
const paths = require("../config/paths");
const checkBrowser = require("../modules/dev-utils/checkBrowser");
const openBrowser = require("../modules/dev-utils/openBrowser");
const choosePort = require("../modules/dev-utils/choosePort");
const prepareUrl = require("../modules/dev-utils/prepareUrl");

const isInteractive = process.stdout.isTTY;
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || "0.0.0.0";

if (!checkRequiredFiles(paths.appHtml, paths.appIndexJs)) {
  process.exit(1);
}

checkBrowser(paths.appPath, isInteractive)
  .then((config) => {
    return choosePort(DEFAULT_PORT, HOST, isInteractive);
  })
  .then((port) => {
    // start webpack dev server
    const protocol = process.env.HTTPS === "true" ? "https" : "http";
    const urls = prepareUrl(protocol, HOST, port);
    // 1. get webpack config
    let compiler;
    try {
      // 2. create webpack compiler
      compiler = webpack(webpackConfig);
    } catch (err) {
      console.log(err.message || err);
    }

    // 3. create webpack dev server config
    const serverConfig = {
      port,
      host: HOST,
    };

    // 4. instantiate webpack dev server
    const devServer = new WebpackDevServer(serverConfig, compiler);
    // 5. launch webpack dev server
    devServer.startCallback(() => {
      console.log(chalk.blue("Start server successfully"));
      openBrowser(urls.localUrlForBrowser);
    });
  })
  .catch((err) => {
    console.log(chalk.red(err.message));
    console.log(err.stack);
  });
