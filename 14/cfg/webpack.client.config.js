const path = require('path')
const { HotModuleReplacementPlugin, DefinePlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
require('dotenv').config()

const NODE_ENV = process.env.NODE_ENV
const IS_DEV = NODE_ENV === 'development'
const IS_PROD = NODE_ENV === 'production'
const GLOBAL_CSS_REGEXP = /\.global\.css$/i
const DEV_PLUGINS = [new CleanWebpackPlugin(), new HotModuleReplacementPlugin()]
const COMMON_PLUGINS = [new DefinePlugin({
  'process.env.CLIENT_ID': `'${process.env.CLIENT_ID}'`,
  'process.env.URI': `'${process.env.URI}'`,
  'process.env.SECRET': `'${process.env.SECRET}'`,
})]

function setupDevtool() {
  if (IS_DEV) return 'eval'
  if (IS_PROD) return false
}

function getEntry() {
  if (IS_PROD) {
    return [path.resolve(__dirname, '../src/client/index.jsx')]
  }

  return [
    path.resolve(__dirname, '../src/client/index.jsx'),
    'webpack-hot-middleware/client?path=http://localhost:3001/static/__webpack_hmr'
  ]
}

// const filename = ext => IS_DEV ? `[name].${ext}` : `[name].[hash].${ext}`

module.exports = {
  target: 'web',
  mode: NODE_ENV ? NODE_ENV : 'development',
  entry: getEntry(),
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: 'client.js',
    publicPath: '/static/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss', '...'],
    alias: {
      'react-dom': IS_DEV ? '@hot-loader/react-dom' : 'react-dom',
      '@': path.resolve(__dirname, 'src'),
      '@example': path.resolve(__dirname, 'src/example'),
    }
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: ['ts-loader']
      },
      {
        test: /\.(s[ac]ss|css)$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]--[hash:base64:5]',
              }
            }
          },
          'sass-loader',
        ],
        exclude: GLOBAL_CSS_REGEXP,
      },
      {
        test: GLOBAL_CSS_REGEXP,
        use: ['style-loader', 'css-loader',]
      }
    ]
  },
  plugins: IS_DEV
    ? DEV_PLUGINS.concat(COMMON_PLUGINS)
    : COMMON_PLUGINS,
  devtool: setupDevtool(),
}