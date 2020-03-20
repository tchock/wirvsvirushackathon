const { webpack } = require('ci-helper');
const slsw = require('serverless-webpack');

module.exports = webpack.serverless({ slsw });
