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

// const promise = new Promise((res) => {
//   setTimeout(() => res('hello'), 1000);
// })
//   .then((message) => {
//     console.log(message);
//     const promise = new Promise((res) => {
//       setTimeout(() => res('world!'), 600);
//     });
//     return promise;
//   })
//   .then((message) => {
//     console.log(message);
//   });

const tasks = [
  () => new Promise((res) => {
    setTimeout(() => res('hello'), 1000);
  }),
  () => Promise.resolve('world!'),
];

tasks.reduce((p, t) => p.then((r) => t().then(Array.prototype.concat.bind(r))), Promise.resolve([]))
  .then((r) => console.log(r));

// Promise.all([
//   new Promise((res) => {
//     setTimeout(() => {
//       console.log('hello completed');
//       res('hello');
//     }, 1000);
//   }),
//   new Promise((res) => {
//     console.log('world completed');
//     res('world!');
//   }),
// ]).then((res) => console.log(res));
