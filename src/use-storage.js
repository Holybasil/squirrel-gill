import { StorageChangeEvent, isInstanceOfChangedStorage } from './custom-event';
import { writeItem, readItem, parseStorage } from './storage';
import { useEffect, useState, useCallback } from 'react';

function useWebStorage(storage, key, defaultValue) {
  const [storageState, setStorageState] = useState(
    readItem(storage, key) ?? defaultValue
  );

  useEffect(() => {
    const onStorageChange = (event) => {
      if (isInstanceOfChangedStorage(event)) {
        if (event.detail.key === key) {
          setStorageState(event.detail.value);
        }
      } else {
        if (event.key === key) {
          setStorageState(parseStorage(event.newValue));
        }
      }
    };

    // current tab
    window.addEventListener(StorageChangeEvent.type, onStorageChange);
    // other tab
    window.addEventListener('storage', onStorageChange);

    if (storage.getItem(key) === null && defaultValue) {
      writeItem(storage, key, defaultValue);
    }

    return () => {
      window.removeEventListener(StorageChangeEvent.type, listener);
      window.removeEventListener('storage', listener);
    };
  }, [key]);

  const setState = useCallback(
    (value) => writeItem(storage, key, value),
    [key]
  );

  return [storageState, setState];
}

export default useWebStorage;
