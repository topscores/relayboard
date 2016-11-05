var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  devtool: 'eval-source-map',
  entry: path.resolve('./client/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve('./client/dist'),
    publicPath: '/client/dist/',
  },
  module: {
    loaders: [
      {
        test: /\.js/,
        loader: 'babel',
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('./client/index.html')
    })
  ]
}