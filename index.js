require('dotenv').load();

const { spawn, execSync, fork } = require('child_process');
const { debug } = require('./server/utils');
const { join } = require('path');

const CASPER = require('./lib/casper-path');

const uid = parseInt(execSync('which whoami | id -u'), 10);
const gid = parseInt(execSync('which whoami | id -g'), 10);

const args = [
  join(__dirname, 'lib', 'scrape.js'),
  `--password=${process.env.PASSWORD}`,
  `--email=${process.env.EMAIL}`,
  `--port=${process.env.PORT}`,
  // @todo grab from command line args, or create web interface to launch....
  `--url=${process.env.URL}`,
  // '--debug=true',
  '--web-security=false',
  '--engine=slimerjs',
  '--headless',
];

const child = spawn(CASPER, args, {
  stdio: 'inherit',
  shell: true,
  gid,
  uid,
});

const forked = fork(join(__dirname, 'server', 'app.js'));

child.on('exit', (code, signal) => {
  debug(`child process existed with code ${code} and signal ${signal}`);
  forked.kill('SIGINT');
});

process.on('SIGINT', () => {
  debug('Requesting server close...');
  forked.kill('SIGINT');
});
