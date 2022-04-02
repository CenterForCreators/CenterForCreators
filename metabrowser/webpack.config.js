const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './app.ts',
  devtool: 'inline-source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      renderer: path.resolve(__dirname, 'renderer/'),
      parser: path.resolve(__dirname, 'parser/'),
      world: path.resolve(__dirname, 'world/'),
      utils: path.resolve(__dirname, 'utils/'),
    }
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.ejs'
    })
  ],
  devServer: {
    static: [{
      directory: path.join(__dirname, 'examples'),
      publicPath: '/examples',
    }, {
      directory: path.join(__dirname, 'assets'),
      publicPath: '/assets',
    }],
  },
};