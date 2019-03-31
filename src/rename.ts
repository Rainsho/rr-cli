import * as fs from 'fs-extra';
import { basename, extname } from 'path';

export interface RenameArgv {
  pattern: string;
  dryRun?: boolean;
  target?: string;
}

function defaultTarget(argv: RenameArgv): string {
  if (argv.target) return argv.target;

  return argv.pattern.replace(/\./g, ' ');
}

export default function rename(argv: RenameArgv) {
  if (!argv.pattern) {
    console.log('NO <pattern> UG2BK?!');
    process.exit(1);
  }

  const cwd = process.cwd();
  const pattern = new RegExp(argv.pattern);
  const target = defaultTarget(argv);

  const files = fs.readdirSync(cwd).filter(file => pattern.exec(file) && !/^\./.test(file));
  const tasks = files
    .map(file => {
      const ext = extname(file);
      const name = basename(file, ext);

      const seg = /(S\d{2}E\d{2})/.exec(name);
      const number = seg ? seg[1] : '';

      return { src: file, dest: `${target} ${number}${ext}` };
    })
    .filter(({ src, dest }) => src !== dest);

  if (!tasks.length) console.log('NO FILES TO RENMAE?!');

  tasks.forEach(({ src, dest }) => {
    if (argv.dryRun) {
      console.log(src, '->', dest);
    } else {
      fs.move(src, dest, () => console.log(src, 'done!'));
    }
  });
}
