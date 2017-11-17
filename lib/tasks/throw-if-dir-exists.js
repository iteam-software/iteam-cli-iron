
const Path = require('path');
const fs = require('fs');

/**
 * If the directory given exists, this task will throw.
 * @param {string} dir The directory relative to the cwd.
 * @return {function} The task to check for existing directory.
 */
function throwIfDirExists(dir) {
  return () => new Promise((res, rej) => {
    if (fs.existsSync(Path.join(process.cwd(), dir))) {
      rej('We cannot continue this command, the directory specified already exists!');
    } else {
      res();
    }
  });
}

module.exports = throwIfDirExists;
