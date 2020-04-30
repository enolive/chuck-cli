const req = require('./src/requests.js');

const argv = process.argv;
const command = argv[2];

module.exports = () => {
    const categories = [
        'explicit',
        'dev',
        'movie',
        'food',
        'celebrity',
        'science',
        'sport',
        'political',
        'religion',
        'animal',
        'history',
        'music',
        'travel',
        'career',
        'money',
        'fashion',
    ];

    switch (command) {
        case 'joke':
            req.requestJoke();
            break;
        case 'categories':
            req.requestCategories();
            break;
        default:
            categories.map((categorie) => {
                if (categorie === command) {
                    req.requestSpecificCategorie(categorie);
                }
            });
    }
};
