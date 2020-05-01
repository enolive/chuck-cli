import { requestCategories, requestJoke, requestJokeForCategory } from './requests';

export const main = async (argv) => {
  const [, , command, category] = argv;
  switch (command) {
    case 'joke':
      if (!category) {
        return requestJoke().then(console.log);
      } else {
        return requestJokeForCategory(category).then(console.log)
                                               .catch((error) => console.error(error.message));
      }
    case 'categories':
      return requestCategories().then(console.log);
  }
};
