const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const chalk = require("chalk");
const path = require("path");
const webpackConfig = require("../webpack.config");

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
  console.log(chalk.blue("Start server successfully http://localhost:3001"));
});
