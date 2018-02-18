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

// what's being done here is not possible with Promises
const showGithubUser = async handle => {
  // in a Promise chain the callbacks are called asynchronously, so we
  // can't use try-catch blocks
  // With async functions we get that power back
  try {
    // asynchronously get the user
    const user = await fetchGithubUser(handle);
    // if we get a success response, then log the user
    logUser(user);
    // but if an error is thrown from the async function we called above,
    // then handle it
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
};

fetchGithubUser('notreallyauser')
  .then(res => console.log(res))
  // we can use catch in a Promise chain because async functions automatically
  // return a rejected promise when an error is thrown
  .catch(err => console.error(`Error: ${err.message}`));

// use our async function which has the added benefit of a try-catch block
showGithubUser('notreallyauser');
showGithubUser('larrybotha');
