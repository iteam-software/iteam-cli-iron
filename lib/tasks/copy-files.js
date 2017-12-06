'use strict';

const fse = require('fs-extra');
const chalk = require('chalk');

/**
 * Copies data from one directory to another.
 * @param {string} source The source to copy from.
 * @param {string} destination The destination to copy to.
 */
function copyFiles(source, destination) {
  return () => fse.copy(source, destination).then(() => {
    console.log(chalk.green(`Copied data to ${destination}.`));
    return `[SUCCESS] Copy ${source} -> ${destination}`;
  });
}

module.exports = copyFiles;