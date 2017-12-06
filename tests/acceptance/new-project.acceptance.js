
const FS = require('fs');

describe('new project', () => {
  let originalTimeout;

  // Initiate a new project command.
  beforeAll(() => {
    // Save the timeout and override it so we can install packages
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;

    // 10 minutes to install packages
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10 * 1000;

    // Create the new command and run it.
    const NewCommand = require('../../lib/commands/new');
    return new NewCommand({name: 'test-project'}).run();
  });

  it('should create the project structure', () => {
    const project = [
      'test-project/src/components/.gitkeep',
      'test-project/src/containers/.gitkeep',
      'test-project/src/middleware/.gitkeep',
      'test-project/src/models/.gitkeep',
      'test-project/src/reducers/.gitkeep',
      'test-project/src/routes/.gitkeep',
      'test-project/test/.gitkeep',
      'test-project/src/components/README.md',
      'test-project/src/containers/README.md',
      'test-project/src/middleware/README.md',
      'test-project/src/models/README.md',
      'test-project/src/reducers/README.md',
      'test-project/src/routes/README.md',
      'test-project/config/webpack.config.js',
      'test-project/.gitignore',
      'test-project/package.json',
      'test-project/src/index.js',
      'test-project/src/routes/routes.json',
    ];

    project.forEach((p) => expect(FS.existsSync(p)).toBe(true));
  });

  it('should install the npm packages');
  it('should initialize the git repository and make an initial commit');
  it('should be buildable');
  it('should be testable');

  afterAll(() => {
    // Reset the jasmine timeout
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;

    // Clean the test area
    return require('../../lib/tasks/clean-dir')('test-project')();
  });
});
