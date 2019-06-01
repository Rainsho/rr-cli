#!/usr/bin/env node

import * as program from 'commander';

const pkg = require('../../package');

program
  .version(pkg.version)
  .description(pkg.description)
  .command('rename', 'rename a TV series in IMDB format')
  .alias('rn')
  .command('ping [hosts]', 'ping one or more hosts')
  .alias('p')
  .parse(process.argv);
