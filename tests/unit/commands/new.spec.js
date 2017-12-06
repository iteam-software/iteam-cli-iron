

describe('command:new', () => {
  beforeAll(() => {
    jest.mock(
      '../../../lib/tasks/change-directory',
      () => (dir) => () => Promise.resolve('test-project')
    );

    jest.mock(
      '../../../lib/tasks/copy-files',
      () => (s, d) => () => Promise.resolve([s, d].join(':'))
    );

    jest.mock(
      '../../../lib/tasks/create-file',
      () => (f, d, o) => () => Promise.resolve([f, JSON.stringify(d), JSON.stringify(o)].join(':'))
    );

    jest.mock(
      '../../../lib/tasks/install-package',
      () => (p, d = false) => () => Promise.resolve([p, d].join(':'))
    );

    jest.mock(
      '../../../lib/tasks/throw-if-dir-exists',
      () => (d) => () => Promise.resolve()
    );
  });

  afterAll(() => jest.resetAllMocks());

  it('should construct with the correct options', () => {
    expect.assertions(2);

    const NewCommand = require('../../../lib/commands/new');

    const command = new NewCommand({ name: 'test-project' });

    expect(command.options.name).toBe('test-project');
    expect(command.defaultPackage).toEqual({
      version: '1.0.0',
      description: 'An awesome new Iron app',
    });
  });

  it('should run the correct tasks in sync mode', () => {
    const NewCommand = require('../../../lib/commands/new');
    const command = new NewCommand({name: 'test-project'});

    expect(command.isSync()).toBe(true);
    
    return command.run()
      .then((r) => {
        // Project name
        expect(r).toEqual(expect.arrayContaining(['test-project']));
        
        // copy files
        expect(r).toEqual(expect.arrayContaining([
          `${process.cwd()}/lib/templates/new-project:test-project`
        ]));

        // All dependencies
        expect(r).toEqual(expect.arrayContaining([
          // deps
          'react:false',
          'react-router-dom:false',
          'react-redux:false',
          'redux:false',
          'prop-types:false',

          // dev deps
          'webpack:true',
          'webpack-dev-server:true',
          'babel-core:true',
          'babel-loader:true',
          'babel-preset-react:true',
          'babel-preset-env:true',
          'html-webpack-plugin:true'
        ]));
      });
  });

  it('should have a cmd line parser', () => {
    const NewCommand = require('../../../lib/commands/new');
    expect(NewCommand.parser).toBeTruthy();
  });

  it('should have the correct name', () => {
    const NewCommand = require('../../../lib/commands/new');
    const command = new NewCommand({name: 'test-project'});

    expect(command.name()).toBe('new');
  });
});
