const fetch = require('isomorphic-fetch');

const getUrl = handle => `https://api.github.com/users/${handle}`;

const logUser = ({name, location}) => {
  console.log(name);
  console.log(location);
};

async function showGithubUserAsync(handle) {
  const url = getUrl(handle);
  const response = await fetch(url);
  const user = await response.json();
  logUser(user);
}

showGithubUserAsync('larrybotha');
