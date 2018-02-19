const Bluebird = require('bluebird');

const log = (...args) => console.log(args);

async function main() {
  // if we pass a value directly to await, then await returns an immediately
  // resolved Promise
  const x = await 42;
  // the above is the equivalent of the following line
  const y = await Promise.resolve(42);

  log(x);
  log(y);
}

async function main2() {
  log('Working...');
  // Bluebird.delay returns an object that is a thenable
  // There is an implicit Promise.resolve wrapped around values preceded
  // by the await keyword.
  // If the argument passed to Promise.resolve has a .then method the final
  // Promise will follow that thenable to its final state
  await Bluebird.delay(2000);
  log('done');
}

// main();
main2();
