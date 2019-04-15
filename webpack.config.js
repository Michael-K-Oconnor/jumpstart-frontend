const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

// var webpack = require('webpack')

// var config = {
//   entry: './index',
//   output: {
//     filename: 'bundle.js',
//     path: __dirname,
//     publicPath: '/login/'
//   }
// }

// if (process.env.NODE_ENV !== 'production') {
//   config.devServer = {
//     inline: true,
//     historyApiFallback: true,
//     port: 3001,
//     host: 'awesome.app'
//   }
// }

// module.exports = config

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  entry: ['@babel/polyfill', './src/index.jsx'],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, './dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    host: '0.0.0.0',
    public: '0.0.0.0',
    port: 8080,
    compress: true,
    hot: true
    // https: true,
    // http2: false
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        loader: 'eslint-loader',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
      inject: false
    })
  ]
};
