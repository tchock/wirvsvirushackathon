const webpack = require('webpack');

const { babel } = require('./loaders');

module.exports = ({ slsw }) => {
  const { stage } = slsw.lib.options;

  return {
    entry: slsw.lib.entries,
    target: 'node',
    node: {
      __dirname: true,
    },
    mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
    resolve: {
      extensions: ['.ts', '.mjs', '.js'],
      mainFields: ['main', 'module'],
    },
    devtool: 'source-map',
    plugins: [
      new webpack.DefinePlugin({
        'process.env.STAGE': JSON.stringify(stage),
      }),
    ],
    module: {
      rules: [babel],
    },
  };
};
