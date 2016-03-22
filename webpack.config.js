var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './lib/index'
  ],
  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/assets/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
      },
      'BASE_API': process.env.BASE_API ? process.env.BASE_API : '"http://localhost:8000"',
      'WS_URL': process.env.WS_URL ? process.env.WS_URL: '"http://localhost:8080/sockjs/"',
      '__DEVTOOLS__': process.env.DEVTOOLS === 'true' ? true : false
    }),
    new HtmlWebpackPlugin({
      title: 'Groceries',
      filename: 'index.html',
      template: 'index.template.html',
      favicon: path.join(__dirname, 'assets', 'images', 'favicon.ico')
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
  ],
  module: {
    loaders: [
      {test: /\.(js|jsx)$/, loaders: ['babel'], include: path.join(__dirname, 'lib')},

      // Required for bootstrap loader
      { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },

      { test: /\.(woff|woff2)/,  loader: "empty-loader" },
      { test: /\.ttf/,    loader: "empty-loader" },
      { test: /\.eot/,    loader: "empty-loader" },
      { test: /\.svg/,    loader: "empty-loader" },

      // Load images
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'empty-loader'
        ]
      }
    ]
  },
  resolve: {
   extensions: ['', '.js', '.jsx']
  }
};
