#!/usr/bin/env node

import * as program from 'commander';
import ping, { PingArgv } from '../ping';

function parsePorts(val: string): number[] {
  const ports = val
    .split(',')
    .map(x => parseInt(x, 10))
    .filter(Boolean);

  return ports.length === 0 ? [80] : ports;
}

function parseTimeout(val: string): number {
  return parseInt(val, 10) || 1000;
}

program
  .option('-p, --ports <p>', 'ports', parsePorts, [80])
  .option('-t, --timeout <t>', 'timeout', parseTimeout, 1000)
  .parse(process.argv);

const { args: hosts, ports, timeout } = program;
const argv: PingArgv = { hosts, ports, timeout };

ping(argv);
