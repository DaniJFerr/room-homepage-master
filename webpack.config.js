const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require("html-webpack-plugin");

let mode = "development";

if (process.env.NODE_ENV === "production") {
  mode = "production";
}

module.exports = {
  entry: {
    main:"./src/app.js",
  },

  mode: mode,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].bundle.js",
    assetModuleFilename: "assets/[name].[hash][ext][query]",
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin(),
    ],
    minimize: true,
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "[name].[contenthash].bundle.css"}),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/template.html",
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true
      } 
   }),
  //  new CopyWebpackPlugin({
  //   patterns: [{ from: 'public', to: 'dist' }],
  // }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          "html-loader"
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: 'assets/[name][ext]', 
        },
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader", //2. Turns css into commonjs
          "sass-loader",
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            cacheDirectory: true,
          }
        },
      },
      {
        test: /\.json$/i,
        type: 'asset/resource',
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 3000,
  },
  
  devtool: mode === "development" ? 'eval-source-map' : 'source-map',
};
