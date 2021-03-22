/*
 * @Author: Eddy Huang
 * @Date: 2021-01-25 15:09:02
 * @LastEditors: Eddy Huang
 * @LastEditTime: 2021-01-25 15:17:11
 * @Description: TODO:
 */
import webpack from 'webpack'
import merge from 'webpack-merge'

import baseConfig from './webpack.base'

import MiniCssExtractPlugin from 'mini-css-extract-plugin'
const miniCssExtractPlugin = new MiniCssExtractPlugin({
    /** write your config here */
    filename: '[name].[hash].css',
    chunkFilename: '[id].[hash].css',
    ignoreOrder: true
})
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
const uglifyJsPlugin = new UglifyJsPlugin({
    cache: true,
    parallel: true,
    sourceMap: false,
    uglifyOptions: {
        warnings: false,
        compress: {
            unused: true,
            drop_debugger: true,
            drop_console: true
        },
        output: {
            comments: false
        }
    }
})
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
const optimizeCSSAssetsPlugin = new OptimizeCSSAssetsPlugin({
    cssProcessorOptions: {
        discardComments: {
            /** remove comments */
            removeAll: true
        }
    }
})

const config: webpack.Configuration = {
  mode: 'production',
  // devtool: 'source-map',
  stats: 'minimal',
  module: {
      rules: [
          {
              test:/\.(c|le)ss$/,
              use: [
                  {
                      loader: MiniCssExtractPlugin.loader
                  },
                  {
                      loader: 'css-loader'
                  },
                  {
                      loader: 'less-loader',
                      options: {
                          lessOptions: {
                              javascriptEnabled: true
                          }
                      }
                  }
              ]
          }
      ]
  },
  plugins: [
      miniCssExtractPlugin,
  ],
  optimization: {
      nodeEnv: 'production',
      minimizer: [
          uglifyJsPlugin,
          optimizeCSSAssetsPlugin
      ]
  }
};

export default merge(baseConfig, config)