function getConfig() {
  switch (process.env.STAGE) {
    case 'prod':
      return {
        buckets: {
          web_app: 'prod-outofthebox-webapp',
        },
      };
    case 'dev':
      return {
        buckets: {
          web_app: 'dev-outofthebox-webapp',
        },
      };
    default:
      return {
        buckets: {},
      };
  }
}

module.exports = getConfig();
