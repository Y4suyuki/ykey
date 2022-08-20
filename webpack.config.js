const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const dotenv = require('dotenv');
const webpack = require("webpack");

dotenv.config();

module.exports = {
  entry: {
    background: "./src/background.ts",
    popup: "./src/popup/index.tsx",
    "content-script": "./src/content-script.ts",
  },
  mode: "none",
  watch: true,
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './options.html',
      chunks: ['popup']
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    })
  ],
  devServer: {
    compress: true,
    open: true,
    port: 9000,
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
};
