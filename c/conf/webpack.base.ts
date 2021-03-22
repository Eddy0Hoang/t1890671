/*
 * @Author: Eddy Huang
 * @Date: 2021-01-25 14:43:16
 * @LastEditors: Eddy Huang
 * @LastEditTime: 2021-01-26 12:46:36
 * @Description: webpack.base.ts
 */

import webpack from "webpack";
import path from "path";

import HtmlWebpackPlugin from "html-webpack-plugin";
const htmlPlugin = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, "../public/index.html"),
  hash: true,
  minify: {
    removeComments: true,
    collapseBooleanAttributes: true,
    removeAttributeQuotes: true,
  },
});

import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { existsSync } from "fs";
const cleanWebpackPlugin = new CleanWebpackPlugin({});

const isDev: boolean = process.env.NODE_ENV === "development";

const config: webpack.Configuration = {
  entry: ["@babel/polyfill", "./src/index.tsx"],
  output: {
    path: path.resolve(__dirname, "../dist/client/"),
    filename: isDev ? "[name].js" : "js/[name].[hash].js",
  },
  target: "web",
  resolve: {
    extensions: [".wasm", ".ts", ".tsx", ".mjs", ".cjs", ".js", ".json"],
    modules: ["node_modules"],
    alias: {
      src: path.resolve("src"),
      pages: path.resolve("src/pages"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env",
            "@babel/preset-react",
            "@babel/preset-typescript",
          ],
          plugins: [
            require("@babel/plugin-proposal-class-properties"),
            require("@babel/plugin-transform-runtime"),
            [
              "import",
              {
                libraryName: "antd",
                style: "css",
              },
            ],
          ],
        },
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          "style-loader",
          "css-loader",
          // 'postcss-loader',
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
          {
            loader: "style-resources-loader",
            options: {
              patterns: path.resolve(__dirname, "../src/global.less"),
              injector: "prepend",
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 100000,
          name: "static/img/[name].[hash:7].[ext]",
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "static/media/[name].[hash:7].[ext]",
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "static/fonts/[name].[hash:7].[ext]",
        },
      },
    ],
  },
  plugins: [htmlPlugin, cleanWebpackPlugin],
};
console.log(
  "exists:",
  existsSync(path.resolve(__dirname, "../src/global.less"))
);
export default config;
