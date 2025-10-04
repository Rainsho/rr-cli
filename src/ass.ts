import * as fs from 'fs-extra';
import { basename, extname } from 'path';

export interface AssArgv {
  yes?: boolean;
}

function extractMovieName(filename: string): string {
  const name = basename(filename, extname(filename));
  // Match format: movie.name.year, remove other information
  const match = /^(.+?)\.(\d{4})/i.exec(name);
  if (match) {
    return `${match[1]}.${match[2]}`;
  }
  return name;
}

export default function ass(argv: AssArgv) {
  const cwd = process.cwd();
  const files = fs.readdirSync(cwd);

  // Find media files
  const mediaFiles = files.filter(file => /\.(mkv|mp4)$/i.test(file) && !/^\./.test(file));

  if (!mediaFiles.length) {
    console.log('NO MEDIA FILES FOUND!');
    process.exit(1);
  }

  // Find subtitle files
  const subtitleFiles = files.filter(file => /\.(ass|srt)$/i.test(file) && !/^\./.test(file));

  const tasks: { src: string; dest: string }[] = [];

  // Process media file(s)
  mediaFiles.forEach(mediaFile => {
    const mediaExt = extname(mediaFile);
    const newName = extractMovieName(mediaFile);
    const newMediaName = `${newName}${mediaExt}`;

    if (mediaFile !== newMediaName) {
      tasks.push({ src: mediaFile, dest: newMediaName });
    }

    // When there's only one media file, rename all subtitle files according to it
    // Otherwise, only rename matching subtitle files
    const shouldRenameAll = mediaFiles.length === 1;
    subtitleFiles.forEach(subtitleFile => {
      const subtitleExt = extname(subtitleFile);
      const subtitleBase = basename(subtitleFile, subtitleExt);
      const mediaBase = basename(mediaFile, mediaExt);

      // If there's only one media file, or subtitle filename matches media filename
      if (shouldRenameAll || subtitleBase.includes(mediaBase) || mediaBase.includes(subtitleBase)) {
        const newSubtitleName = `${newName}${subtitleExt}`;
        if (subtitleFile !== newSubtitleName) {
          tasks.push({ src: subtitleFile, dest: newSubtitleName });
        }
      }
    });
  });

  if (!tasks.length) {
    console.log('NO FILES TO RENAME!');
    return;
  }

  tasks.forEach(({ src, dest }) => {
    if (argv.yes) {
      fs.move(src, dest, { overwrite: true }, err => {
        if (err) {
          console.error(`Error renaming ${src}:`, err);
        } else {
          console.log(`${src} -> ${dest}`);
        }
      });
    } else {
      console.log(`${src} -> ${dest}`);
    }
  });
}
