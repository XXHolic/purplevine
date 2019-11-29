const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: "/node_modules",
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env"]],
            plugins: [
              "@babel/transform-arrow-functions",
              "@babel/plugin-syntax-dynamic-import"
            ]
          }
        }
      },


    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "error",
      // favicon: "./src/favicon.ico",
      template: "./src/index.html",
      minify: {
        //压缩HTML文件
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: false //删除空白符与换行符
      }
    }),

  ],
  optimization: {
    splitChunks: {
      // 提取公共第三放插件
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        }
      }
    }
  },
  node: {
    fs: "empty"
  },
  devServer: {
    contentBase: './dist',
    port: 3000,
    stats: 'errors-warnings'
  },
};