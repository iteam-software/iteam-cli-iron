'use strict';

const changeDirectory = require('../../../lib/tasks/change-directory');

it('it should change the directory of the running process', () => {
  process.chdir = jest.fn();
  return changeDirectory('test')()
    .then((msg) => {
      expect(process.chdir.mock.calls.length).toBe(1);
      expect(msg).toEqual(expect.stringContaining('Moved to dir test'));
    });
});
