/*
 * @Author: Eddy Huang
 * @Date: 2021-01-25 15:06:36
 * @LastEditors: Eddy Huang
 * @LastEditTime: 2021-01-26 12:51:08
 * @Description: TODO:
 */
import webpack from "webpack";
import merge from "webpack-merge";

import baseConfig from "./webpack.base";

import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'
const friendlyErrorsWebpackPlugin = new FriendlyErrorsWebpackPlugin({

})
const port:number = process.env.PORT ? +process.env.PORT : 0
const config: webpack.Configuration = {
  mode: "development",
  devtool: "source-map",
  devServer: {
    port: port || 3000,
    hot: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3090',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  },
  optimization: {
    nodeEnv: "development",
  },
  plugins: [
    friendlyErrorsWebpackPlugin,
    new webpack.HotModuleReplacementPlugin()
  ]
};
export default merge(baseConfig, config);
