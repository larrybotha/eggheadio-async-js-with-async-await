const fetch = require('isomorphic-fetch');

const getUrl = handle => `https://api.github.com/users/${handle}`;

const logUser = ({name, location}) => {
  console.log(name);
  console.log(location);
};

const fetchGithubUser = async handle => {
  const url = getUrl(handle);
  const response = await fetch(url);
  const body = await response.json();

  if (response.status !== 200) {
    // an async function will automatically return a rejected promise
    // whenever an error is thrown
    // This allows us to chain a catch onto the call-site of the async
    // function
    throw Error(body.message);
  }

  return body;
};

fetchGithubUser('larrybotha').then(logUser);
