#!/usr/bin/env node

import * as program from 'commander';
import rename, { RenameArgv } from '../rename';

program
  .option('-y, --yes', 'confirm')
  .option('-p, --pattern <p>', 'source name pattern')
  .option('-t, --target <t>', 'target name pattern')
  .parse(process.argv);

const { yes, pattern, target } = program;
const argv: RenameArgv = { yes, pattern, target };

rename(argv);
