'use strict';

const path = require('path'),
  VueLoaderPlugin = require('vue-loader/lib/plugin'),
  libraryName = 'cache-clear',
  outputFilename = process.env.NODE_ENV === 'production'
    ? `${libraryName}.min.js`
    : `${libraryName}.js`;

module.exports = {
  mode: process.env.NODE_ENV,
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: outputFilename,
    library: libraryName,
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue']
  },
  plugins: [new VueLoaderPlugin()]
};
