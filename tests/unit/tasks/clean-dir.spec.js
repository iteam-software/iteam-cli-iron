
it('should clean a given dir', () => {
  jest.mock('rimraf', () => (p, cb) => {
    expect(p).toEqual(expect.stringContaining('test'));
    cb();
  });
  const cleanDir = require('../../../lib/tasks/clean-dir');  

  return cleanDir('test')()
    .then(() => expect.anything());
});

it('should gracefully handle an error', () => {
  jest.mock('rimraf', () => (p, cb) => {
    cb(1);
  });

  const cleanDir = require('../../../lib/tasks/clean-dir');

  return cleanDir('test')()
    .catch((err) => expect(err).toBe(1));
});
