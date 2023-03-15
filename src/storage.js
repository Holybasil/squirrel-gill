import { StorageChangeEvent } from "./custom-event";
export function parseStorage(value) {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function stringifyStorage(value) {
  return JSON.stringify(value);
}

export function readItem(storage, key) {
  const value = storage.getItem(key);
  return parseStorage(value);
}

export function writeItem(storage, key, value) {
  try {
    if (value === null) {
      storage.removeItem(key);
      window.dispatchEvent(new StorageChangeEvent({ key, value: null }));
    } else if (typeof value === "string") {
      storage.setItem(key, value);
      window.dispatchEvent(new StorageChangeEvent({ key, value }));
    } else {
      storage.setItem(key, stringifyStorage(value));
      window.dispatchEvent(new StorageChangeEvent({ key, value }));
    }
  } catch (error) {
    throw error;
  }
}
