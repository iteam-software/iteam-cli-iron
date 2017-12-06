
beforeEach(() => {
  jest.mock('path', () => ({
    resolve: (a, b) => `${a}/${b}`,
  }));
  jest.mock('rimraf', () => (p, cb) => {
    if (p.includes('fail')) {
      cb(1);
    } else {
      cb(0);
    }
  })
});

it('should clean a given dir', () => {
  expect.assertions(1);

  const cleanDir = require('../../../lib/tasks/clean-dir');  

  return cleanDir('test')()
    .then(() => expect(true).toBeTruthy());
});

it('should gracefully handle an error', () => {
  expect.assertions(1);

  const cleanDir = require('../../../lib/tasks/clean-dir');

  return cleanDir('fail')()
    .catch((err) => expect(err).toBe(1));
});

afterEach(() => {
  jest.resetAllMocks();
});