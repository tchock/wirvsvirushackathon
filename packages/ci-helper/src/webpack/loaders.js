const EXCLUDE = /(node_modules[/\\](?!@bojagi))/;

const TEST_TS = /\.(t|j)s$/;

module.exports = {
  babel: {
    test: TEST_TS,
    exclude: EXCLUDE,
    use: {
      loader: 'babel-loader',
    },
  },
};
