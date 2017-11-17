'use strict';

const chalk = require('chalk');
const log = console.log;

/**
 * Core CLI command runner.
 */
class CLI {

  /**
   * Invoke the CLI command.
   * @param {string[]} args The arguments passed to this invocation.
   */
  static invoke(args) {
    // The first arg is the command we will run. The remaining args should be
    // parsed and loaded into the command.
    if (!args.length) {
      console.error('You must specify a command to continue');
      return -1;
    }

    try {
      let options = {};
      const Command = require('../commands/' + args[0]);
      
      if (Command.parser) {
        Object.assign(options, Command.parser.parseArgs(args.slice(1)));
      }

      // Construct this command instance
      const instance = new Command(options);

      log(chalk.yellow(`Running ${instance.name()} command...`));

      // Invoke the tasks
      instance
        .run()
        .then((r) => log(chalk.green(r)))
        .catch((err) => log(`Error: ${chalk.red(err)}`));
    } catch (err) {
      log(chalk.red(err));
    }
  }
}

module.exports = CLI;
