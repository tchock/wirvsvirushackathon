const { buckets } = require('../config');

const { deploy: deployToBucket } = require('../targets/bucket');

const DESCRIPTION = `
deploys an app based on the given <kind> and <name>.

<kind> has to be one of  
  
  - bucket: uploads to a given bucket, 
      <name> is one of 
        - ${Object.keys(buckets).join('\n        - ')}
`;

const SOURCE_DESCRIPTION = `source of the data, defaults to /dist

example: ci-helper deploy --source=/build bucket webapp
uploads from build folder
`;

const ROUTE_DESCRIPTION = `(bucket only) route of the bucket, defaults to /

example: ci-helper deploy --route=/app bucket webapp
  uploads to gs://bucket-name/app/
`;

module.exports = program => {
  program
    .command('deploy <kind> [name]')
    .description(DESCRIPTION)
    .option('-source, --source [value]', SOURCE_DESCRIPTION)
    .option('-route, --route [value]', ROUTE_DESCRIPTION)
    .action(async (kind, name, cmd) => {
      switch (kind) {
        case 'bucket':
          if (buckets[name] === undefined) {
            throw new Error(`unkown bucket key ${name}, known buckets are ${Object.keys(buckets)}`);
          }
          deployToBucket({
            bucket: buckets[name],
            src: cmd.source,
            route: cmd.route,
          });
          break;
        default:
          break;
      }
    });
};
