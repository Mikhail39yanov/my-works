const path = require('path')
const nodeExternals = require('webpack-node-externals')
const { DefinePlugin } = require('webpack')
require('dotenv').config()

const NODE_ENV = process.env.NODE_ENV
const IS_DEV = NODE_ENV === 'development'
const IS_PROD = NODE_ENV === 'production'
const GLOBAL_CSS_REGEXP = /\.global\.css$/i

function setupDevtool() {
  if (IS_DEV) return 'eval'
  if (IS_PROD) return false
}

module.exports = {
  mode: NODE_ENV ? NODE_ENV : 'development',
  target: 'node',
  entry: path.resolve(__dirname, '../src/server/server.js'),
  output: {
    path: path.resolve(__dirname, '../dist/server'),
    filename: 'server.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss', '...'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@example': path.resolve(__dirname, 'src/example'),
    }
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: ['ts-loader'],
      },
      {
        test: /\.(s[ac]ss|css)$/i,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
              onlyLocals: true
            }
          },
          'sass-loader',
        ],
        exclude: GLOBAL_CSS_REGEXP,
      },
      {
        test: GLOBAL_CSS_REGEXP,
        use: ['css-loader',]
      }
    ]
  },
  optimization: {
    minimize: false
  },
  plugins: [new DefinePlugin({
    'process.env.CLIENT_ID': `'${process.env.CLIENT_ID}'`,
    'process.env.URI': `'${process.env.URI}'`,
    'process.env.SECRET': `'${process.env.SECRET}'`,
  })],
  devtool: setupDevtool()
}