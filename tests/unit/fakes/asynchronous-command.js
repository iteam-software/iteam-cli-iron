
const SynchronousCommand = require('./synchronous-command');

/**
 * Provides a fake asynchronous command
 */
class AsynchronousCommand extends SynchronousCommand {
  isSync() {
    return false;
  }
}

module.exports = AsynchronousCommand;
