const fetch = require('node-fetch');

const requestJoke = async () => {
  const url = 'https://api.chucknorris.io/jokes/random';
  const response = await fetch(url);
  const data = await response.json();
  return data.value;
};

const requestJokeForCategory = async (category) => {
  const categories = await requestCategories();
  const [found] = await categories.filter((c) => c === category);
  if (!found) {
    throw new Error(`category ${category} not found!`);
  }
  return requestSpecificCategory(found);
};

const requestCategories = async () => {
  const url = 'https://api.chucknorris.io/jokes/categories';
  const response = await fetch(url);
  return await response.json();
};

const requestSpecificCategory = async (category) => {
  const url = `https://api.chucknorris.io/jokes/random?category=${category}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.value;
};

module.exports = {
  requestJoke,
  requestJokeForCategory,
  requestCategories,
};
