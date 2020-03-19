const DESCRIPTION = `
builds an app based on the given <kind> and <name>.

<kind> has to be one of  
  
  - docker: pushes new image to registry and starts the service in kubernetes

<name> has to be the folder name of the service (for example api)  
`;

module.exports = program => {
  program
    .command('build <kind> <name>')
    .description(DESCRIPTION)
    .action(kind => {
      switch (kind) {
        default:
          // eslint-disable-next-line no-console
          console.log(`unkown kind ${kind}`);
          process.exit(1);
          break;
      }
    });
};
