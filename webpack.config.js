var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: ['babel-polyfill', './public/javascripts/main.js'],
  output: { path: __dirname, filename: 'bundle.js', publicPath: 'http://localhost:9090/assets/' },
  module: {
    loaders: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          plugins: ['transform-flow-strip-types', 'transform-runtime'],
          presets: ['es2016', 'es2015', 'stage-2', 'react']
        }
      }
    ]
  },
};

