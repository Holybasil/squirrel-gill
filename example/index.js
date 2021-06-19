import React from 'react';
import { render } from 'react-dom';
import useStorage from '../lib/';

class MyStorage {
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

const myStorage = new MyStorage();

const App = () => {
  let [name, setName] = useStorage(myStorage, 'name', 'xixixi');

  const onChangeToM = () => {
    setName('misty');
  };
  const onChangeToH = () => {
    setName('holybasi');
  };
  const onClear = () => {
    setName(null);
  };
  return (
    <div>
      <button onClick={onChangeToM}>Change To Misty</button>
      <button onClick={onChangeToH}>Change To Holybasil</button>
      <button onClick={onClear}>Clear</button>
      <h1>{name}</h1>
    </div>
  );
};

render(<App />, document.getElementById('root'));
