
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Path = require('path');

module.exports = {
  entry: 'src/index.js',
  output: {
    path: 'build',
    filename: 'index.[hash:8].js'
  },
  module: {
    rules: [{
      test: /(\.js|\.jsx)$/,
      exclude: /node_modules/,
      use: {
        presets: ['env', 'react', 'stage-0'],
        plugins: [require('babel-plugin-transform-object-reset-spread')]
      }
    }, {
      test: /\.html$/,
      exclude: /node_modules/,
      use: {
        loader: 'file-loader',
      }
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
  ],
};
