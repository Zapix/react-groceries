var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './lib/index'
  },
  output: {
    filename: '[name].min.js',
    path: path.join(__dirname, 'build'),
    publicPath: ''
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      },
      'BASE_API': process.env.BASE_API ? process.env.BASE_API : '"http://localhost:8000"',
      'WS_URL': process.env.WS_URL ? process.env.WS_URL: '"http://localhost:8080/sockjs/"',
      '__DEVTOOLS__': false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      title: 'Groceries',
      filename: 'index.html',
      template: 'index.template.html',
      favicon: path.join(__dirname, 'assets/images/favicon.ico')
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
  cssnext: {
    browsers: 'last 2 versions'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
