#!/usr/bin/env node

import * as program from 'commander';
import ass from '../ass';

program.option('-y, --yes', 'Execute renaming without confirmation').parse(process.argv);

ass(program.opts());
