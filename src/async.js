const fetch = require('isomorphic-fetch');

const getUrl = handle => `https://api.github.com/users/${handle}`;

const logUser = ({name, location}) => {
  console.log(name);
  console.log(location);
};

// Instead of using promises directly, we can use async await. async / await
// allows one to take asynchronous code and write it in a more sequential
// way that reads more easily from top to bottom.
// It looks more like sequential code than async code.
function showGithubUser(handle) {
  const url = getUrl(handle);

  fetch(url)
    .then(res => res.json())
    .then(logUser);
}

// firstly, we make the function asynchronous using the aysnc keyword
// Without doing this we'll get a SyntaxError specifying that await may only
// be used inside an async function
async function showGithubUserAsync(handle) {
  const url = getUrl(handle);

  // We use await to wait for a response.
  // await takes a promise, and blocks any further execution until the promise
  // is either rejected or resolved
  // If the promise is rejected, it'll throw, otherwise it simply returns the
  // response
  // We'd likely put this inside a try-catch block
  const response = await fetch(url);

  // When we get the response, execution continues
  // We need to parse json from the response. Because this is also a promise,
  // we use await to signal that execution should be blocked until it resolves
  const user = await response.json();

  // we can then log our user
  logUser(user);
}

// showGithubUser('larrybotha');
showGithubUserAsync('larrybotha');
