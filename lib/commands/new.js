const slug = require('slug');
const Parser = require('argparse').ArgumentParser;

const Command = require('../abstractions/command');

class NewCommand extends Command {
  /**
   * Construct a NewCommand with the given options.
   * @param {Object} options 
   * @param {string} options.name The name of the project.
   */
  constructor(options) {
    super();

    this.options = options;
  }

  name() {
    return 'new';
  }

  /**
   * Tasks necessary to generate a new Iron project.  The following must
   * occur:
   *  1. Make sure the directory does not exist.
   *  2. Create directory.
   *  3. Add core app files.
   *  4. Initialize the git repo.
   *  5. Install dependencies.
   * @return {function[]} The new command tasks.
   */
  tasks() {
    return [
      require('../tasks/throw-if-dir-exists')(slug(this.options.name)),
      () => Promise.reject('Not implemented yet, thanks for trying!'),
    ];
  }
}

const parser = new Parser({
  addHelp: true,
  description: 'Creates a new Iron project',
});

parser.addArgument('name');

NewCommand.parser = parser;

module.exports = NewCommand;
