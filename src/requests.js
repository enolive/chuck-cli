const fetch = require('node-fetch');

const requestJoke = async () => {
    const url = 'https://api.chucknorris.io/jokes/random';
    const response = await fetch(url);
    const data = await response.json();
    return console.log(data.value);
};

const requestCategories = async () => {
    const url = 'https://api.chucknorris.io/jokes/categories';
    const response = await fetch(url);
    const data = await response.json();
    for (const item of data) {
        console.log(item);
    }
};

const requestSpecificCategorie = async (category) => {
    const url = `https://api.chucknorris.io/jokes/random?category=${category}`;
    const response = await fetch(url);
    const data = await response.json();
    return console.log(data.value);
};

module.exports = {
    requestJoke,
    requestCategories,
    requestSpecificCategorie,
};
