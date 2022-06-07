const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const appDirectory = process.cwd();
module.exports = {
  mode: "development",
  entry: path.resolve(appDirectory, "src/index.js"),
  output: {
    filename: "[name].bundle.js",
    path: path.resolve("dist"),
    clean: true, //clean the output directory before generate bundles
  },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     title: "mini-react",
  //   }),
  // ],
};
