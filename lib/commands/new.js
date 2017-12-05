const {spawn} = require('child_process');
const Path = require('path');
const fse = require('fs-extra');
const slug = require('slug');
const chalk = require('chalk');
const Parser = require('argparse').ArgumentParser;

const Command = require('../abstractions/command');
const CreateFile = require('../tasks/create-file');

const DEFAULT_PACKAGE = {
  version: '1.0.0',
  description: 'An awesome new Iron app',
};

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
    const name = slug(this.options.name);
    const packageData = Object.assign({}, DEFAULT_PACKAGE, {name});
    const templatePath = Path.join(__dirname, '../templates/new-project');

    return [
      // Ensure the directory is usable
      require('../tasks/throw-if-dir-exists')(name),

      // Copy the iron template files
      () => fse
        .copy(templatePath, name).then(() => 'Iron template copied!'),

      // Create the package.json file
      CreateFile('package.json', packageData, {relativeDir: name}),

      // Install npm packages
      () => new Promise((res, rej) => {
        // move to the project folder
        process.chdir(name);

        const depInstaller = spawn('npm', ['install', '--save',
          'react',
          'react-router-dom',
          'react-redux',
          'redux',
          'prop-types',
        ]);

        const devInstaller = spawn('npm', ['install', '--save-dev',
          'babel-core',
          'babel-loader',
          'babel-preset-react',
          'babel-preset-env',
          'webpack',
          'webpack-dev-server',
          'html-webpack-plugin',
        ]);

        const flags = {
          Dependencies: false,
          DevDependencies: false,
        };

        const handleStderr = (data) => {
          console.log(chalk.red(data));
        }

        const handleClose = (name) => (code) => {
          if (code) {
            return rej(`${name} failed to install with code: ${code}`);
          }

          flags[name] = true;

          if (flags.Dependencies && flags.DevDependencies) {
            res('NPM packages installed!');
          }
        };

        depInstaller.stderr.on('data', handleStderr);
        devInstaller.stderr.on('data', handleStderr);
        depInstaller.on('close', handleClose('Dependencies'));
        devInstaller.on('close', handleClose('DevDependencies'));
      }),
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
