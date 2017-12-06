'use strict';

const {spawn} = require('child_process');
const chalk = require('chalk');

/**
 * Install a given package.
 * @param {string} name The name of the NPM package to install.
 * @param {boolean} isDev True if this is a dev package.
 */
function installPackage(name, isDev = false) {
  return () => new Promise((res, rej) => {
    const args = ['install', name, isDev ? '--save-dev' : '--save'];
    const thread = spawn('npm', args, {shell: true});

    thread.on('close', (code) => {
      if (code) {
        console.log(chalk.red(`Failed to install NPM package ${name}`));
        rej(`[FAILED] InstallPackage (${code}) ${name}`);
      } else {
        console.log(chalk.green(`NPM package install complete: ${name}`));
        res(`[SUCCESS] InstallPackage ${name}`);
      }
    });
  });
}

module.exports = installPackage;
