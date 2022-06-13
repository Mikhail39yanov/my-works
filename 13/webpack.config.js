// const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = (env) => ({
  entry: './src/js/index.js',
  output: {
    filename: env.prod ? 'main.[contenthash].js' : 'main.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/i,
        use: [
          env.prod ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          env.prod ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.jpe?g$/,
        // type: 'asset/resource',
        type: 'asset',
      },
      {
        test: /\.svg$/,
        type: "asset",
        use: 'svgo-loader',
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Форма оплаты',
      template: 'index.html',
      // filename: env.prod ? 'index.[contenthash].html' : 'index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: env.prod ? 'main.[contenthash].css' : 'main.css',
    }),
  ],
  devServer: {
    // historyApiFallback: true,
    hot: true,
    port: 3000,
    compress: true,
    // open: true,
  },
  optimization: {
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin(),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminGenerate,
          options: {
            plugins: [
              'imagemin-mozjpeg',
            ],
          },
        },
      }),
    ],
  },
  // devtool: env.prod ? 'eval' : false
})
