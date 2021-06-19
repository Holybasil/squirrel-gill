// Ref: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent
export class StorageChangeEvent extends CustomEvent {
  static type = 'StorageChangeEvent';
  constructor(keyValue) {
    super(StorageChangeEvent.type, { detail: keyValue });
  }
}

export function isInstanceOfChangedStorage(event) {
  return (
    event &&
    (event instanceof StorageChangeEvent ||
      (event.detail && event.type === StorageChangeEvent.type))
  );
}
