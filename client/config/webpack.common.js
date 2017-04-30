var webpack = require("webpack")
var HtmlWebpackPlugin = require("html-webpack-plugin")
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var FaviconsWebpackPlugin = require('favicons-webpack-plugin')
var helpers = require("./helpers")

module.exports = {
  entry: {
    "polyfills": "./client/app/polyfills.ts",
    "vendor": "./client/app/vendor.ts",
    "app": "./client/app/main.ts"
  },

  resolve: {
    extensions: [".ts", ".js", ".scss"]
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: "awesome-typescript-loader",
            options: { 
              configFileName: helpers.root('client', 'tsconfig.json')
            }
          },
          {
            loader: "angular2-template-loader",
          },
          {
            loader: "angular2-router-loader",
          }
        ]
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader?sourceMap"
            },
            {
              loader: "sass-loader"
            },
            {
              loader: "postcss-loader?sourceMap",
              options: {
                plugins: function () {
                  return [
                    require('autoprefixer')
                  ]
                }
              }
            },
            {
              loader: "sass-loader?sourceMap"
            }
          ]
        })
      },
      {
        test: /\.(svg|woff|woff2|ttf|eot|otf)$/,
        loader: 'file-loader?name=assets/fonts/[name].[hash].[ext]',
        include: helpers.root("client", "assets", "fonts")
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        loader: 'file-loader?name=assets/images/[name].[hash].[ext]',
        include: helpers.root("client", "assets", "images"),
        exclude: helpers.root("client", "assets", "images", "icons")
      },
      {
        test: /\.svg?$/,
        loader: 'svg-sprite-loader!svgo-loader',
        include: helpers.root("client", "assets", "images", "icons")
      }
    ]
  },

  plugins: [
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      helpers.root('client'),
      {}
    ),
    
    new webpack.optimize.CommonsChunkPlugin({
      name: ["app", "vendor", "polyfills"]
    }),
    
    new HtmlWebpackPlugin({
      template: "client/index.html"
    }),

    new ExtractTextPlugin("assets/styles/[name].[hash].css"),

    new FaviconsWebpackPlugin({
      logo: "./client/assets/images/favicon.png",
      prefix: "assets/images/favicons/"
    })
  ],

  output: {
    path: helpers.root("dist", "client"),
    publicPath: "/",
    filename: "app/[name].[hash].js",
    chunkFilename: "app/[id].[hash].chunk.js"
  }
}