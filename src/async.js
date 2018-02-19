// polyfillish
Symbol.asyncIterator = Symbol.asyncIterator || Symbol('asyncIterator');

const log = (...args) => console.log(args);

// a function which generates delays
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// an async generator
// This generator yields 3 promises, because it's async
async function* someGen() {
  // it's async because we're blocking until each delay is resolved
  await delay(1000);
  yield 1;
  await delay(1000);
  yield 2;
  await delay(1000);
  yield 3;
}

async function main() {
  // a for await of loop
  // It's async because of the await keyword
  // It will only iterate after the async function resolves
  // for await (const value of someGen()) {
  //   log(value);
  // }

  // The above is equivalent to using a while loop:
  const gen = someGen();
  while (true) {
    const {value, done} = await gen.next();

    if (done) {
      break;
    }

    log(value);
  }
}

main();
