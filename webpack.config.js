const path = require("path");
const appDirectory = process.cwd();
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  entry: { index: path.resolve(appDirectory, "src/index.js") },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve("dist"),
    clean: true, //clean the output directory before generate bundles
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(appDirectory, "public/index.html"),
    }),
  ],
};
