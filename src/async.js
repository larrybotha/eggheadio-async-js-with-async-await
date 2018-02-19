const fetch = require('isomorphic-fetch');

const getUrl = handle => `https://api.github.com/users/${handle}`;

const log = (...args) => console.log(args);

const fetchfromGithub = async handle => {
  const url = getUrl(handle);
  const response = await fetch(url);
  return await response.json();
};

async function showUserAndRepos(handle) {
  // the problem here is that the requests are made sequentially, and not in
  // parallel
  // The second request waits for the first request to succeed before executing
  // If each request takes .5s, the two requests will take 1s
  // Analogy: boiling eggs. Boiling eggs in sequence, vs in parallel
  // const user = await fetchfromGithub(handle);
  // const repos = await fetchfromGithub(`${handle}/repos`);

  // To get around this, we can execute the calls immediately, and assign the
  // returned promises to variables. This way, the requests are fired off in
  // parallel, and we can then wait for the responses.
  const userPromise = fetchfromGithub(handle);
  const reposPromise = fetchfromGithub(`${handle}/repos`);

  // after assigning and executing our async requests, we can now assign the
  // responses to variables using await.
  // Because both Promises are already pending by this stage, they can be
  // resolved concurrently, and we're not waiting for one to finish before the
  // next begins
  const user = await userPromise;
  const repos = await reposPromise;

  // we are blocking execution above using await - only once both have resolved
  // will we get here
  log(user.name);
  log(repos.length);
}

showUserAndRepos('larrybotha');
