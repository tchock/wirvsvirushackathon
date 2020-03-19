const program = require('commander');
const { deploy, build, combineCoverage } = require('./commands');

const DESCRIPTION = `
  Internal helper tool for continuos integration and deployment. 
  Install in all our apps as dev dependency.
  
  Besides the given options of the specific command there are two environment variables this package makes use of:
  
  - VERSION (optional): version tag to use
  - STAGE: node environment to use, should be one of
  
    * prod
    * dev
    * test
    * local`;

module.exports = function bin() {
  program.description(DESCRIPTION).version(require('../package.json').version, '-v, --version');

  deploy(program);
  build(program);
  combineCoverage(program);

  program.parse(process.argv);
};
