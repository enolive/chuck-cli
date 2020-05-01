import fetchMock from 'jest-fetch-mock';
import { requestCategories, requestJoke, requestJokeForCategory } from '../src/requests';

beforeEach(() => fetchMock.resetMocks());

test('Request joke calls API', () => {
  requestJoke();

  expect(fetchMock).toHaveBeenCalledTimes(1);
  expect(fetchMock).toHaveBeenCalledWith('https://api.chucknorris.io/jokes/random');
});

const mockReturnedJoke = (jokeText) => {
  fetchMock.mockResponseOnce(`{
    "value": "${jokeText}"
  }`);
};

test('Request joke should return a joke.', async () => {
  mockReturnedJoke('Here is the joke');
  await expect(requestJoke()).resolves.toEqual('Here is the joke');
});

test('Request categories calls the API', () => {
  requestCategories();

  expect(fetchMock).toHaveBeenCalledTimes(1);
  expect(fetchMock).toHaveBeenCalledWith('https://api.chucknorris.io/jokes/categories');
});

const mockReturnedCategories = categories => {
  fetchMock.mockResponseOnce(categories);
};

test('Request categories returns all the categories.', async () => {
  // language=JSON
  mockReturnedCategories('["first", "second"]');

  await expect(requestCategories()).resolves.toEqual(['first', 'second']);
});

test('Request joke for category calls the API.', async () => {
  // language=JSON
  mockReturnedCategories('["first", "second"]');
  mockReturnedJoke('The joke');
  await requestJokeForCategory('first');

  expect(fetchMock).toHaveBeenCalledTimes(2);
  expect(fetchMock).toHaveBeenNthCalledWith(1, 'https://api.chucknorris.io/jokes/categories');
  expect(fetchMock).toHaveBeenNthCalledWith(2, 'https://api.chucknorris.io/jokes/random?category=first');
});

test('Request joke for category returns the expected joke.', async () => {
  // language=JSON
  mockReturnedCategories('["first", "second"]');
  mockReturnedJoke('The joke');

  await expect(requestJokeForCategory('first')).resolves.toEqual('The joke');
});

test('Request joke for not existing category fails.', async () => {
  // language=JSON
  mockReturnedCategories('["first", "second"]');

  await expect(requestJokeForCategory('not here')).rejects.toEqual(new Error('category not here not found!'));
  expect(fetchMock).toHaveBeenCalledTimes(1);
});
