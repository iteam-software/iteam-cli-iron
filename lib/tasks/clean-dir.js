'use strict';

const rimraf = require('rimraf');
const Path = require('path');

/**
 * Create a clean dir task.
 * @param {string} dir The dir to clean relative to the cwd.
 */
function cleanDir(dir) {
  return () => {
    return new Promise((res, rej) => {
      rimraf(Path.resolve(process.cwd(), dir), (err) => {
        if (err) {
          rej(err);
        } else {
          res();
        }
      });
    });
  }
};

module.exports = cleanDir;
