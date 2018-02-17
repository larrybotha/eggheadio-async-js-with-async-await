const fetch = require('isomorphic-fetch');

const getUrl = handle => `https://api.github.com/users/${handle}`;

const logUser = ({name, location}) => {
  console.log(name);
  console.log(location);
};

async function showGithubUserAsync(handle) {
  const url = getUrl(handle);
  const response = await fetch(url);

  // return the result of response.json();
  // When this resolves, the caller of showGithubUserAsync will receive a
  // resolved Promise
  return await response.json();
}

// 1. When an async function is called, it returns a Promise
// 2. When an async function returns a value, it returns a resolved Promise
// with that value
// Because of the above, we can chain 'then' and 'catch' onto an async function
// as with Promises - because it returns a Promise
showGithubUserAsync('larrybotha').then(logUser);
