const fetch = require('isomorphic-fetch');

const getUrl = handle => `https://api.github.com/users/${handle}`;

const logUser = ({name, location}) => {
  console.log(name);
  console.log(location);
};

const fetchfromGithub = async handle => {
  const url = getUrl(handle);
  const response = await fetch(url);
  return await response.json();
};

async function showUserAndRepos(handle) {}

showUserAndRepos('larrybotha');
