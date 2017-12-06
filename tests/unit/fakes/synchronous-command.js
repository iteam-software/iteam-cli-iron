
const Command = require('../../../lib/abstractions/command');

module.exports = class SynchronousCommand extends Command {
  constructor() {
    super();

    this.results = [];
  }

  tasks() {
    return [
      () => new Promise((res) => {
        setTimeout(() => {
          res('first');
          this.results.push('first');
        }, 5);
      }),
      () => {
        this.results.push('second');
        return Promise.resolve('second');
      },
    ];
  }
};
