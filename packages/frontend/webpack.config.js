const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PnpWebpackPlugin = require(`pnp-webpack-plugin`);

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  mode: 'development',
  entry: ['./src/index.tsx'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[hash].js',
    publicPath: '/app',
  },
  module: {
    rules: [
      {
        test: /\.css?$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(t|j)sx?$/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        loader: 'babel-loader',
      },
      {
        test: /\.graphql$/,
        use: {
          loader: 'webpack-graphql-loader',
          options: {
            output: 'document',
          },
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
    ],
  },
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'src')],
    extensions: ['mjs', '.ts', '.js', '.json', '.tsx', '.jsx', '.css'],
    plugins: [
      PnpWebpackPlugin,
    ],
  },
  resolveLoader: {
    plugins: [
      PnpWebpackPlugin.moduleLoader(module),
    ],
  },
  devtool: 'source-map',
  context: __dirname,
  target: 'web',

  plugins: [
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/index.ejs`,
      inject: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
