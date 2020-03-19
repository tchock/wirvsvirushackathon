const merge = require('webpack-merge');
const config = require('./webpack.config');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(config, {
  plugins: [
    // // Comment in to analyse bundle size
    // new BundleAnalyzerPlugin({
    //   defaultSizes: 'gzip',
    // }),
  ],
  mode: 'production',
  devtool: false,
});
