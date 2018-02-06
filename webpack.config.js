const webpack = require('webpack');
const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');

const __PROJECT__ = process.env.PROJECT || 'sample_1';
const __DEV__ = process.env.NODE_ENV !== 'production';

let config = {
  entry: {
    app: path.resolve(__dirname, `${__PROJECT__}/src/js/index.js`),
    utils: [ './utils' ]
    // vendors: [
    //   'phaser-ce/build/custom/pixi.js',
    //   'phaser-ce/build/custom/p2.js',
    //   'phaser-ce/build/custom/phaser-split.js'
    // ]
  },
  output: {
    filename: `[name].js?${__DEV__ ? '' : '[chunkhash:8]'}`,
    path: path.resolve(__dirname, `${__PROJECT__}/dist`)
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg)$/,
        use: {
          loader: 'file-loader',
          options: {}
        }
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, `${__PROJECT__}/src`),
    },
  },
  devServer: {
    contentBase: path.join(__dirname, `${__PROJECT__}/dist`)
  },
  devtool: __DEV__ ? 'source-map' : '',
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['utils'],
      filename: `[name].js?${__DEV__ ? '' : '[chunkhash:8]'}`
    }),
    new HtmlPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, `${__PROJECT__}/src/index.html`)
    }),
    new webpack.DefinePlugin({
      __DEV__: __DEV__
    })
  ]
};

if (!__DEV__) {
  config.plugins.push(
    new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"'}),
    new webpack.optimize.UglifyJsPlugin({parallel: true})
  );
}

module.exports = config;
