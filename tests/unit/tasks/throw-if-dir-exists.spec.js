
const throwIfDirExists = require('../../../lib/tasks/throw-if-dir-exists');

it('should throw if the dir exists', () => {
  expect.assertions(1);

  return throwIfDirExists('tests')()
    .catch((msg) => {
      expect(msg).toEqual(expect.stringContaining('[FAILED]'));
    });
});

it('should not throw if the dir does not exist', () => {
  expect.assertions(1);

  return throwIfDirExists('not-a-dir')()
    .then(() => expect(true).toBeTruthy());
});