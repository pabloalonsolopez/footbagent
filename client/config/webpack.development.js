var webpackMerge = require("webpack-merge")
var commonConfig = require("./webpack.common.js")
var helpers = require("./helpers")

module.exports = webpackMerge(commonConfig, {
  devtool: "cheap-module-eval-source-map",

  devServer: {
    historyApiFallback: true,
    stats: "minimal",
    proxy: {
      "/api": {
        target: 'http://localhost:3000'
      }
    }
  }
})