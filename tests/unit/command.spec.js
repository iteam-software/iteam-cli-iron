const Command = require('../../lib/abstractions/command');
const SynchronousCommand = require('./fakes/synchronous-command');

it('should construct a command', () => {
  expect(new Command()).toBeTruthy();
});

it('should have no tasks on the abstractions', () => {
  expect(new Command().tasks().length).toBe(0);
});

it('should throw if name is called on the abstraction', () => {
  expect(() => new Command().name()).toThrow();
});

it('should synchronsouly run', () => {
  expect.assertions(1);

  const command = new SynchronousCommand();

  return command
    .run()
    .then(r => expect(command.results).toEqual(['first', 'second']));
});
