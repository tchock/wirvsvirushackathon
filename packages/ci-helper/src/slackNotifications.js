const path = require('path');
const { IncomingWebhook } = require('@slack/client');
const config = require('./config');

const notifier = createNotifier(config.slack);

function createNotifier(url) {
  const hook = url
    ? new IncomingWebhook(url)
    : {
        send(msg, cb) {
          console.log(`note: ${msg}`); // eslint-disable-line no-console
          cb();
        },
      };
  return {
    send(msg) {
      return new Promise((resolve, reject) => {
        hook.send(msg, err => (err ? reject(err) : resolve()));
      });
    },
  };
}

function getReleaseUrl() {
  return `https://github.com/tchock/wirvsvirushackathon/releases/tag/${process.env.VERSION}`;
}

function getReleaseInfo() {
  if (process.env.STAGE !== 'dev') {
    return getReleaseUrl();
  }
  return '';
}

module.exports = {
  async deployed() {
    const appName = require(path.join(process.cwd(), 'package.json')).name;
    return notifier.send(
      `release of ${appName}.
    Stage: ${process.env.STAGE}
    ${
      process.env.STAGE === 'dev'
        ? ``
        : `Version: ${process.env.VERSION}
  `
    }
  ${getReleaseInfo()}`
    );
  },
};
