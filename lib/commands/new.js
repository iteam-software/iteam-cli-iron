'use strict';

const Path = require('path');
const slug = require('slug');
const Parser = require('argparse').ArgumentParser;

const Command = require('../abstractions/command');
const createFile = require('../tasks/create-file');
const installPackage = require('../tasks/install-package');
const copyFiles = require('../tasks/copy-files');
const changeDirectory = require('../tasks/change-directory');
const throwIfDirExists = require('../tasks/throw-if-dir-exists');

class NewCommand extends Command {
  /**
   * Construct a NewCommand with the given options.
   * @param {Object} options 
   * @param {string} options.name The name of the project.
   */
  constructor(options) {
    super();

    this.options = options;
    const startOpts = [
      '--env.IRON_DEBUG=true',
      '--history-api-fallback',
      '--content-base build/',
      '--devtool source-map',
    ];
    const buildOpts = [
      '--env.IRON_DEBUG=false',
      '--progress',
    ];
    this.defaultPackage = {
      version: '1.0.0',
      description: 'An awesome new Iron app',
      scripts: {
        test: 'jest',
        build: 'webpack ' + buildOpts.join(' '),
        start: 'webpack-dev-server ' + startOpts.join(' '),
      }
    };
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
    const packageData = Object.assign({}, this.defaultPackage, {name});
    const templatePath = Path.join(__dirname, '../templates/new-project');

    return [
      // Ensure we can create a clean dir
      throwIfDirExists(name),

      // Copy the template files
      copyFiles(templatePath, name),

      // Generate a new package.json
      createFile('package.json', packageData, {relativeDir: name}),

      // Change to the project dir
      changeDirectory(name),

      // Install dependencies
      installPackage('history'),
      installPackage('prop-types'),
      installPackage('react'),
      installPackage('react-dom'),
      installPackage('react-redux'),
      installPackage('react-router'),
      installPackage('react-router-dom'),
      installPackage('react-router-redux@next'),
      installPackage('redux'),
      installPackage('redux-thunk'),
      installPackage('title-case'),

      // Install dev dependencies
      installPackage('babel-core', true),
      installPackage('babel-loader', true),
      installPackage('babel-plugin-transform-object-rest-spread', true),
      installPackage('babel-preset-env', true),
      installPackage('babel-preset-react', true),
      installPackage('babel-preset-stage-0', true),
      installPackage('clean-webpack-plugin', true),
      installPackage('file-loader', true),
      installPackage('html-webpack-plugin', true),
      installPackage('webpack', true),
      installPackage('webpack-dev-server', true),
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
