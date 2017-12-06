

describe('install package', () => {
  let callback;

  beforeAll(() => {
    const mockSpawn = jest.fn(() => {
      const impl = {};
      impl.on = (event, cb) => {
        callback = cb;
      }

      return impl;
    });

    jest.mock('child_process', () => ({ spawn: mockSpawn }));
    console.log = jest.fn();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should spawn a thread to run npm install', () => {
    expect.assertions(1);

    const installPackage = require('../../../lib/tasks/install-package');

    const promise = installPackage('jest')()
      .then((msg) => {
        expect(msg).toEqual(expect.stringContaining('[SUCCESS]'));
      });

    callback();

    return promise;
  });

  it('should gracefully handle a non-zero close', () => {
    expect.assertions(1);

    const installPackage = require('../../../lib/tasks/install-package');

    const promise = installPackage('jest', true)()
      .catch((msg) => {
        expect(msg).toEqual(expect.stringContaining('[FAILED]'));
      });

    callback(1);

    return promise;
  });
});
