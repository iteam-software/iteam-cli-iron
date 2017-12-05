
const Path = require('path');
const FS = require('fs');
const shell = require('shelljs');
const chalk = require('chalk');

const DEFAULT_OPTIONS = {
  baseDir: '.',
  encoding: 'UTF-8',
};

const CREATED = '+';

/**
 * Create a file given the options.
 * @param {string} name The name of the file (extension included).
 * @param {object|string} The data to write.
 * @param {object} options File creation options
 * @param {string} options.baseDir The base directory to create the file in.
 * Default is the current directory.
 * @param {string} options.relativeDir The directory relative to the base.
 * @param {string} options.encoding The file encoding. Default is UTF-8.
 */
function createFileFactory(name, data, options) {
  options = Object.assign({}, DEFAULT_OPTIONS, options);

  const directory = Path.resolve(options.baseDir, options.relativeDir);

  return () => new Promise((res, rej) => {
    if (!FS.existsSync(directory)) {
      shell.mkdir('-p', directory);
    }

    FS.writeFile(
      Path.resolve(directory, name),
      typeof data === 'string' ? data : JSON.stringify(data, null, 2),
      (err) => {
        if (err) {
          rej(err);
        } else {
          res(`${CREATED} ${Path.join(options.relativeDir, name)}`);
        }
      }
    )
  });
}

module.exports = createFileFactory;
