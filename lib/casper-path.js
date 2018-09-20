const { execSync } = require('child_process');

function casperPath() {
  try {
    return execSync('which casperjs', {
      encoding: 'utf8',
    });
  } catch (e) {
    return 'node ./node_modules/casperjs/bin/casperjs.js';
  }
}

module.exports = casperPath();
