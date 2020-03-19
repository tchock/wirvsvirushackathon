const { execSync } = require('child_process');
const path = require('path');

function exec(cmd) {
  return execSync(cmd, { stdio: 'inherit' });
}

function deploy({
  src = '/dist',
  absoluteSrc = path.join(process.cwd(), src),
  bucket,
  route = '',
}) {
  exec(
    // console.log(
    `aws s3 sync ${absoluteSrc} s3://${bucket}${route} --acl public-read --cache-control max-age=2635200,public --exclude "*.html"`
  );

  exec(
    `aws s3 sync ${absoluteSrc} s3://${bucket}${route} --acl public-read --cache-control no-cache --exclude "*" --include "*.html"`
  );
}

module.exports = {
  deploy,
};
