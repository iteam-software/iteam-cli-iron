'use strict';

const changeDirectory = require('../../../lib/tasks/change-directory');

it('should change the directory of the running process', () => {
  expect.assertions(2);

  process.chdir = jest.fn();

  return changeDirectory('test')()
    .then((msg) => {
      expect(process.chdir.mock.calls.length).toBe(1);
      expect(msg).toEqual(expect.stringContaining('Moved to dir test'));
    });
});

it('should gracefully handle a chdir failure', () => {
  expect.assertions(1);

  process.chdir = jest.fn(() => {throw new Error()});

  return changeDirectory('test')()
    .catch((msg) => {
      expect(msg).toEqual(expect.stringContaining('[FAILED]'));
    });
});

afterEach(() => jest.resetAllMocks());
