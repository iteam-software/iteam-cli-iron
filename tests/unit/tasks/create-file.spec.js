
describe('create file', () => {
  let mkdirMock;

  beforeEach(() => {
    jest.mock('path', () => ({
      resolve: (a, b) => `${a}/${b}`,
      join: (...a) => a.join('/'),
    }));

    jest.mock('fs', () => ({
      existsSync: (dir) => !dir.includes('no-dir'),
      writeFile: (p, d, cb) => {
        if (d === 'error-me') {
          cb(1);
        } else {
          cb();
        }
      },
    }));

    jest.mock('shelljs', () => {
      const mkdir = jest.fn();
      mkdirMock = mkdir;
      return { mkdir };
    });

    JSON.stringify = jest.fn();
  });

  afterEach(() => jest.resetAllMocks());

  it('should make the parent dir if it does not exist', () => {
    expect.assertions(1);

    const createFile = require('../../../lib/tasks/create-file');

    return createFile('test.file', '', { relativeDir: 'no-dir' })()
      .then(() => expect(mkdirMock.mock.calls.length).toBe(1));
  });

  it('should write regular string data', () => {
    expect.assertions(2);

    const createFile = require('../../../lib/tasks/create-file');

    return createFile('create.file', '')()
      .then((msg) => {
        expect(msg).toEqual(expect.stringContaining('[SUCCESS]'));
        expect(JSON.stringify.mock.calls.length).toBe(0);
      });
  });

  it('should write a javascript object as a JSON string', () => {
    expect.assertions(2);

    const createFile = require('../../../lib/tasks/create-file');

    return createFile('create.file', {})()
      .then((msg) => {
        expect(msg).toEqual(expect.stringContaining('[SUCCESS]'));
        expect(JSON.stringify.mock.calls.length).toBe(1);
      });
  });

  it('should gracefully handle a creation exception', () => {
    expect.assertions(1);

    const createFile = require('../../../lib/tasks/create-file');

    return createFile('create.file', 'error-me')()
      .catch((msg) => expect(msg).toEqual(expect.stringContaining('[FAILED]')));
  });
});