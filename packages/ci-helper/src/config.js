function getConfig() {
  switch (process.env.STAGE) {
    case 'prod':
      return {
        slack: 'tbd',
        buckets: {
          web_app: 'tbd',
        },
      };
    case 'dev':
      return {
        slack: 'tbd',
        buckets: {
          web_app: 'dev-tbd',
        },
      };
    default:
      return {
        buckets: {},
      };
  }
}

module.exports = getConfig();
