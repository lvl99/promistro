# Promistro 🤞

Simple way to debounce using promises.

Heavily inspired by [debounce-promise](https://npmjs.com/package/debounce-promise).

## Installation

```sh
npm i promistro
yarn add promistro
pnpm add promistro
```

## Usage

`promistro()` wraps the operation in a promise, and it will only execute after a period of time elapses after the last trigger.

```js
// Create your debounced trigger
var getCart = promistro(function () {
  return fetch("/cart.js").then((res) => res.json());
});

// Fire the trigger multiple times within the time period
// (default: 100ms). It will only execute once.
getCart().then((cart) => console.log("Here's the cart", cart));
getCart().then((cart) => console.log("I need this too", cart));

// Outputs:
// -> "Here's the cart" { ... }
// -> "I need this too" { ... }
```

For the example above, it will debounce a `fetch` call to retrieve the cart contents. You could fire `getCart()` 100 times within 100ms and it would only execute once.

Because the output function returns a promise, you can chain it with further operations (`then`, `catch`, `finally`).

Multiple trigger executions chain from the same debounced promise and can therefore react to the same return result when it has completed.

## Options

### `wait`

The period of time to debounce the async operation. The execution will happen at the end of this period.

Default value: `100`

### `leading`

The `leading` option allows you to trigger the operation at the first trigger, then then at the end of the debounced period.

Default value: `false`

### `accumulate`

If you have multiple triggers which are doing different things, this option allows you to accumulate all the arguments into an array. You can then choose to do what you need with them all, e.g. merge all into a single object, or just pick the first set of args, the last set of args, etc.

If this option is enabled, then the executing function will receive a single argument which is an array of arrays, each entry holding all the arguments that were provided to the trigger function.

Default value: `false`

## Contribute

Have suggestions, questions or feedback? Found a bug? [Post an issue](https://github.com/lvl99/promistro/issues)
Added a feature? Fixed a bug? Wrote some much needed tests? [Post a PR](https://github.com/lvl99/promistro/compare)

## License

[Apache-2.0](LICENSE.md)
