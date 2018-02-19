
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

}

