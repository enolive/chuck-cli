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
    default:
      console.log(`usage
  chuck joke [<category>]     # displays a random joke. lets you choose the <category> optionally
  chuck categories            # displays the available categories
`);
  }
};
