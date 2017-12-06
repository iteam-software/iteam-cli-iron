
let mockNewCommand = require('../../../lib/commands/new');

describe('cli:index', () => {
  beforeEach(() => {
    console.log = jest.fn();
  });

  afterEach(() => jest.resetAllMocks());

  it('should invoke commands', (done) => {
    expect.assertions(1);

    mockNewCommand.prototype.run = jest.fn(() => Promise.resolve().then(() => {
      expect(true).toBe(true);
      done();
    }));

    jest.mock('../../../lib/commands/new', () => mockNewCommand);

    const CLI = require('../../../lib/cli');

    CLI.invoke(['new', 'test-project'])
  });

  it('should fail when given invalid args', () => {
    const CLI = require('../../../lib/cli');
    
    expect(CLI.invoke([])).toBe(-1);
  });

  it('should gracefully handle an unknown command', () => {
    const CLI = require('../../../lib/cli');
    
    CLI.invoke('invalid-command');

    expect(console.log.mock.calls[0][0]).toEqual(
      expect.stringContaining('Cannot find module'));
    expect(console.log.mock.calls.length).toBe(1);
  });
});
