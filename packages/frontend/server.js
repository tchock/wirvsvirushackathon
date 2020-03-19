const fs = require('fs-extra');
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

// const configPath = `${__dirname}/config/config.ts`;
// const devConfigPath = `${__dirname}/config/config.localdev.ts`;

// copy local config if not there yet
// if (!fs.existsSync(configPath)) {
//   fs.copySync(devConfigPath, configPath);
// }

// Dev specific webpack config
config.entry = [
  'webpack-dev-server/client?http://localhost:3002',
  'webpack/hot/only-dev-server',
  ...config.entry,
];

config.plugins = [
  new webpack.NamedModulesPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  ...config.plugins,
];

config.devtool = 'source-map';

config.output.publicPath = '/';

new WebpackDevServer(webpack(config), {
  publicPath: '/',
  hot: true,
  contentBase: [path.join(__dirname, 'src'), path.join(__dirname, 'public')],
  stats: { colors: true },
  historyApiFallback: {
    disableDotRule: true,
  },
  disableHostCheck: true,
  inline: true,
  open: true,
  openPage: '/',
  overlay: true,
}).listen(3002, function(err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:3002');
});
