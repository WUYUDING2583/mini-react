const path = require("path");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const chalk = require("chalk");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const appDirectory = process.cwd();

const webpackConfig = {
  mode: "development",
  entry: path.resolve(appDirectory, "src/index.js"),
  output: {
    filename: "[name].bundle.js",
    path: path.resolve("dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "mini-react",
    }),
  ],
};

let compiler;
try {
  compiler = webpack(webpackConfig);
} catch (err) {
  console.log(err.message || err);
}

const serverConfig = {
  port: 3001,
  open: true,
};

const devServer = new WebpackDevServer(serverConfig, compiler);
devServer.startCallback(() => {
  console.log(chalk.blue("Start server successfully http://localhost:3001"));
});
