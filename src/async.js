const fetch = require('isomorphic-fetch');

const getUrl = handle => `https://api.github.com/users/${handle}`;

const log = (...args) => console.log(args);

const fetchfromGithub = async handle => {
  const url = getUrl(handle);
  const response = await fetch(url);
  return await response.json();
};

async function showUserAndRepos(handle) {
  // Promise.all takes a sequence of Promises, executes them concurrently, and
  // then returns a single promise if they all resolve, else rejects
  // if one of them doesn't resolve
  // Promise.all aggregates the results of multiple promises
  // Furthermore, if any of the Promises are rejected, then Promise.all will
  // reject immediately - it doesn't wait for the remaining Promises to resolve
  // or reject
  const [user, repos] = await Promise.all([
    fetchfromGithub(handle),
    fetchfromGithub(`${handle}/repos`),
  ]);

  log(user.name);
  log(repos.length);
}

showUserAndRepos('larrybotha');
