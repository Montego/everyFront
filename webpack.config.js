let path = require('path');
let webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  plugins: [
    new HtmlWebpackPlugin(),
    // new VueLoaderPlugin()
  ],
  module: {

    rules: [
      {
        // test: /\.css$/,
        test:  /\.(css|sass)$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(svg|eot|woff|ttf|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: "fonts/[name].[ext]"
            }
          }
        ]
      }
    ]
  },

  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,

    publicPath: '/dist/',
    proxy: {
        // '/everyBack': {
        // target: 'http://localhost:8085/',
        // pathRewrite: {'^/everyBack' : ''},
        ws: true,
        changeOrigin: true
      // }
    }
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
