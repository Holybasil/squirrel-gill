function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { StorageChangeEvent, isInstanceOfChangedStorage } from './custom-event';
import { writeItem, readItem, parseStorage } from './storage';
import { useEffect, useState, useCallback } from 'react';

function useStorage(storage, key, defaultValue) {
  var _readItem;

  var _useState = useState((_readItem = readItem(storage, key)) !== null && _readItem !== void 0 ? _readItem : defaultValue),
      _useState2 = _slicedToArray(_useState, 2),
      storageState = _useState2[0],
      setStorageState = _useState2[1];

  useEffect(function () {
    var onStorageChange = function onStorageChange(event) {
      if (isInstanceOfChangedStorage(event)) {
        if (event.detail.key === key) {
          setStorageState(event.detail.value);
        }
      } else {
        if (event.key === key) {
          setStorageState(parseStorage(event.newValue));
        }
      }
    }; // current tab


    window.addEventListener(StorageChangeEvent.type, onStorageChange); // other tab

    window.addEventListener('storage', onStorageChange);

    if (storage.getItem(key) === null && defaultValue) {
      writeItem(storage, key, defaultValue);
    }

    return function () {
      window.removeEventListener(StorageChangeEvent.type, onStorageChange);
      window.removeEventListener('storage', onStorageChange);
    };
  }, [key]);
  var setState = useCallback(function (value) {
    return writeItem(storage, key, value);
  }, [key]);
  return [storageState, setState];
}

export default useStorage;