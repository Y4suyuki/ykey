const path = require("path");

module.exports = {
  entry: {
    background: "./src/background.ts",
    popup: "./src/popup.ts",
    "content-script": "./src/content-script.ts",
  },
  mode: "none",
  watch: true,
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
};
