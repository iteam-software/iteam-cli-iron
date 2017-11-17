'use strict';

const chalk = require('chalk');
const log = console.log;

/**
 * Core CLI command runner.
 */
class CLI {
  constructor(options) {
    this._options = options;
  }

  /**
   * Invoke the CLI command.
   * @param {Object} args The arguments passed to this invocation.
   */
  invoke(args) {
    // dummy implementation
    log(chalk.yellow('Hello, world!'));
  }
}
