const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const chalk = require("chalk");
const detect = require("detect-port-alt");

const webpackConfig = require("../config/webpack.config");
const checkRequiredFiles = require("../modules/dev-utils/checkRequiredFiles");
const paths = require("../config/paths");
const checkBrowser = require("../modules/dev-utils/checkBrowser");
const prompts = require("prompts");

const isInteractive = process.stdout.isTTY;
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || "0.0.0.0";

if (!checkRequiredFiles(paths.appHtml, paths.appIndexJs)) {
  process.exit(1);
}

checkBrowser(paths.appPath, isInteractive)
  .then((config) => {
    // 1. detect port
    detect(DEFAULT_PORT, HOST)
      .then(async (port) => {
        if (port !== DEFAULT_PORT) {
          // switch port
          const question = {
            type: "confirm",
            name: "shouldChangePort",
            message:
              chalk.yellow(`${DEFAULT_PORT} is occupied.`) +
              "\n\nWould you like to run the app on the another port instead?",
          };
          const { shouldChangePort } = await prompts(question);
          if (!shouldChangePort) {
            process.exit(1);
          }
        }
        process.exit(1);
        let compiler;
        try {
          compiler = webpack(webpackConfig);
        } catch (err) {
          console.log(err.message || err);
        }

        const serverConfig = {
          port: 3001, //set the port to 3001
          open: true, // open browser after compiling finish
        };

        const devServer = new WebpackDevServer(serverConfig, compiler);
        devServer.startCallback(() => {
          console.log(
            chalk.blue("Start server successfully http://localhost:3001")
          );
        });
      })
      .catch((err) => {
        console.log(chalk.red("All ports are occpuied."));
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(chalk.red(err.message));
    console.log(err.stack);
  });
