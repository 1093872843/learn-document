const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ProgressPlugin = require("progress-webpack-plugin");
module.exports = {
  mode: "development",
  entry: "./index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ProgressPlugin({
      percentBy: "entries", // 或其他适当的选项
    }),
  ],
  devServer: {
    static: path.join(__dirname, "dist/bundle.js"),
    compress: true,
    port: 8080,
  },
  stats: {
    all: false, // 禁用所有默认输出
    errors: true, // 启用错误信息输出
    warnings: true, // 启用警告信息输出
  },
};
