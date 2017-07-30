const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const pug = new ExtractTextPlugin('../index.html');
const css = new ExtractTextPlugin('../css/style.css');

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
      test: /\index.pug$/,
      use: pug.extract(['raw-loader', 'pug-html-loader'])
    },
    {
      test: /\.css$/,
      use: css.extract(['css-loader'])
    }]
  },
  plugins: [
    pug,
    css
  ],
  devtool: 'source-map',
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  devServer: {
    hot: true,
    inline: true,
    contentBase: path.resolve(__dirname, 'public'),
    publicPath: '/'
  }
};
