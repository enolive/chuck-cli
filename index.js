const req = require('./src/requests.js');

const argv = process.argv;
const command = argv[2];
const category = argv[3];

module.exports = () => {
    switch (command) {
        case 'joke':
            if (!category) {
                req.requestJoke().then(console.log);
            } else {
                req.requestJokeForCategory(category)
                    .then(console.log)
                    .catch((error) => console.error(error.message));
            }
            break;
        case 'categories':
            req.requestCategories().then(console.log);
            break;
    }
};
