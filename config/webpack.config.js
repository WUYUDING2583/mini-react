const HtmlWebpackPlugin = require("html-webpack-plugin");
const paths = require("./paths");
module.exports = {
  mode: "development",
  entry: { index: paths.appIndexJs },
  output: {
    filename: "[name].bundle.js",
    path: paths.appBuild,
    clean: true, //clean the output directory before generate bundles
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: paths.appHtml,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
