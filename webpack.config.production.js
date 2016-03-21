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
    new ExtractTextPlugin('app.css', { allChunks: true }),
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
      {
        test: /\.less/,
        loader: 'style!css!less'
      },
      {test: /\.css$/, loader: 'style-loader!css-loader!cssnext-loader'},
      {test: /\.(js|jsx)$/, loaders: ['babel'], include: path.join(__dirname, 'lib')},

      // Required for bootstrap loader
      { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },
      { test: /fullcalendar/, loader: 'imports?$=jquery,moment' },
      { test: /\.(woff|woff2)/,  loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf/,    loader: "file-loader" },
      { test: /\.eot/,    loader: "file-loader" },
      { test: /\.svg/,    loader: "file-loader" },


      // Load images
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
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
