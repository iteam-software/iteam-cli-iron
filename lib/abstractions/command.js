'use strict';

module.exports = class Command {
  isSync() {
    return true;
  }
  
  tasks() {
    return [];
  }
  
  name() {
    throw new Error('A command must have a name.');
  }

  run() {
    const tasks = this.tasks();
    if (this.isSync()) {
      return tasks.reduce((p, t) => p.then(r => t().then(Array.prototype.concat.bind(r))), Promise.resolve([]));
    } else {
      return Promise.all(tasks.map(t => t()));
    }
  }
};
