#!/usr/bin/env node

import * as program from 'commander';
import rename, { RenameArgv } from '../rename';

program
  .option('--dry-run', 'do a dry-run')
  .option('-p, --pattern <p>', 'source name pattern')
  .option('-t, --target <t>', 'target name pattern')
  // .option('-s, --series', 'enable series marker')
  .parse(process.argv);

const { dryRun, pattern, target } = program;
const argv: RenameArgv = { dryRun, pattern, target };

rename(argv);
