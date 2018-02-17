const fetch = require('isomorphic-fetch');

const getUrl = handle => `https://api.github.com/users/${handle}`;

const logUser = ({name, location}) => {
  console.log(name);
  console.log(location);
};

// async function showGithubUserAsync(handle) {

// Write the function as an expression
// const showGithubUserAsync = async function(handle) {

// write the function as an expression using arrow
const showGithubUserAsync = async handle => {
  const url = getUrl(handle);
  const response = await fetch(url);

  return await response.json();
}

// await can't be used at the top-level of a file - it's a syntax error, as
// it can only reside inside a function
// To get around this, we can use the IIFE pattern
(async () => {
})();
