[![npm downloads](https://img.shields.io/npm/dw/squirrel-gill)](https://www.npmjs.com/package/squirrel-gill)
[![npm version](https://img.shields.io/npm/v/squirrel-gill.svg)](https://www.npmjs.com/package/squirrel-gill)

# squirrel-gill

React Hooks about `localStorage` or `sessionStorage`.

## Features

:notes: **Free Choice**. You can decide where the data is stored, sessionStorage or localStorage. You can even define a `Map`, proxy `set` and `get` as `setItem` and `getItem` respectively.

> Note: Map is not persistant.

```js
class MyStorage {
  // https://github.com/tc39/proposal-class-fields#private-fields
  #storage = new Map();

  getItem(key) {
    return this.#storage.get(key) ?? null;
  }

  setItem(key, value) {
    this.#storage.set(key, value);
  }

  removeItem(key) {
    this.#storage.delete(key);
  }
}
```

:star2: **Sync Both In One Tab Or Multiple Tabs**. Storage event handlers only fire if the storage event is triggered from another window. [See for details](https://stackoverflow.com/questions/3055013/html5-js-storage-event-handler). Now you don’t have to worry about this problem.

:feet: **Tiny**. No other dependencies but only native apis.

## Install

With npm

    npm install --save squirrel-gill

With yarn:

    yarn add squirrel-gill

## Usage

```js
import useStorage from 'squirrel-gill';

// ...
const [name, setName] = useStorage(sessionStorage, 'name');
```

## Development

For dev dependencies,

```sh
npm i
```

Then

```sh
npm run example
```
