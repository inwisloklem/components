const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const index = new ExtractTextPlugin('../index.html');
const style = new ExtractTextPlugin('../css/style.css');

module.exports = {
  entry: './assets/index.js',
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: 'index.js'
  },
  module: {
    rules: [{
      test: /\.pug$/,
      use: 'pug-loader'
    },
    {
      test: /index\.pug/,
      use: index.extract(['raw-loader', 'pug-html-loader'])
    },
    {
      test: /\.css$/,
      use: style.extract(['css-loader'])
    }]
  },
  plugins: [
    index,
    style,
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: {
        baseDir: ['public']
      }
    })
  ],
  devtool: 'source-maps',
  watch: true,
  watchOptions: {
    aggregateTimeout: 100
  }
};
