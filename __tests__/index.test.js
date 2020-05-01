import { main } from '../src';
import { requestCategories, requestJoke, requestJokeForCategory } from '../src/requests';

jest.mock('../src/requests');
console.log = jest.fn();
console.error = jest.fn();

beforeEach(() => jest.resetAllMocks());

test('displays a joke', async () => {
  requestJoke.mockReturnValue(Promise.resolve('Yoke!'));

  await main(['/usr/bin/node', 'chuck', 'joke']);

  expect(console.log).toHaveBeenCalledTimes(1);
  expect(console.log).toHaveBeenCalledWith('Yoke!');
});

test('displays a joke for a specific category', async () => {
  requestJokeForCategory.mockReturnValue(Promise.resolve('Yoke!'));

  await main(['/usr/bin/node', 'chuck', 'joke', 'dev']);

  expect(requestJokeForCategory).toHaveBeenCalledWith('dev');
  expect(console.log).toHaveBeenCalledTimes(1);
  expect(console.log).toHaveBeenCalledWith('Yoke!');
});

test('displays an error for wrong category', async () => {
  requestJokeForCategory.mockReturnValue(Promise.reject(new Error('Yikes!')));

  await main(['/usr/bin/node', 'chuck', 'joke', 'bogus']);

  expect(console.error).toHaveBeenCalledTimes(1);
  expect(console.error).toHaveBeenCalledWith('Yikes!');
});

test('displays the available categories', async () => {
  requestCategories.mockReturnValue(Promise.resolve(['first', 'second']));

  await main(['/usr/bin/node', 'chuck', 'categories']);

  expect(console.log).toHaveBeenCalledTimes(1);
  expect(console.log).toHaveBeenCalledWith(['first', 'second']);
});

test('displays the usage', async () => {
  const usage = `usage
  chuck joke [<category>]     # displays a random joke. lets you choose the <category> optionally
  chuck categories            # displays the available categories
`;

  await main(['/usr/bin/node', 'chuck']);

  expect(console.log).toHaveBeenCalledTimes(1);
  expect(console.log).toHaveBeenCalledWith(usage);
});