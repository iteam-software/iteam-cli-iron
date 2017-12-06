'use strict';

/**
 * Change the cwd to another directory.
 * @param {string} dir The directory to change to.
 */
function changeDirectory(dir) {
  return () => new Promise((res, rej) => {
    try {
      process.chdir(dir);
      res(`[SUCCESS] Moved to dir ${dir}`);
    } catch (e) {
      rej(`[FAILED] Unable to move dirs.\n${e}`);
    }
  });
}

module.exports = changeDirectory;
