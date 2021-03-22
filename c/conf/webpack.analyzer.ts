/*
 * @Author: Eddy Huang
 * @Date: 2021-01-25 15:14:56
 * @LastEditors: Eddy Huang
 * @LastEditTime: 2021-01-25 15:17:34
 * @Description: TODO:
 */

import webpack from "webpack";
import merge from "webpack-merge";

import prodConfig from "./webpack.prod";

import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
const bundleAnalyzerPlugin = new BundleAnalyzerPlugin({});
const config: webpack.Configuration = {
  optimization: {
    minimizer: [bundleAnalyzerPlugin],
  },
};

export default merge(prodConfig, config);
