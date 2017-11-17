'use strict';

module.exports = class Command {
  /**
   * Get the sync flag for this command.
   * @return {boolean} True if the tasks in this command should run
   * synchronously, false if otherwise.
   */
  isSync() {
    return true;
  }
  
  /**
   * Get the tasks for this command.
   * @return {function[]} An array of functions each of which should return
   * a Promise.
   */
  tasks() {
    return [];
  }
  
  /**
   * Get the name of this command.
   * @return {string} The name.
   */
  name() {
    throw new Error('A command must have a name.');
  }

  /**
   * Run the tasks for this command.
   * @return {Promise} A promise to resolve the tasks.
   */
  run() {
    const tasks = this.tasks();
    if (this.isSync()) {
      // Runs the tasks in order and passes an array of results on to
      // the next task in the chain.
      return tasks.reduce((p, t) =>
        p.then(r => 
          t(r).then(Array.prototype.concat.bind(r))
        ), Promise.resolve([]));
    } else {
      return Promise.all(tasks.map(t => t()));
    }
  }
};
