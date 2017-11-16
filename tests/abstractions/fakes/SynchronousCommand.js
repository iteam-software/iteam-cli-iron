
const Command = require('../../../lib/abstractions/command');

module.exports = class SynchronousCommand extends Command {
  // isSync() {
  //   return false;
  // }
  constructor() {
    super();

    this.results = [];
  }

  tasks() {
    return [
      () => new Promise((res) => {
        setTimeout(() => {
          results.push('first');
          res('first');
        }, 500);
      }),
      () => {
        results.push('second');
        return Promise.resolve('second');
      },
    ];
  }

  name() {
    return 'Fake:SynchronousCommand';
  }
};
