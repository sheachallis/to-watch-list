export class StorageService {
  public static readonly instance = new StorageService();

  private readonly storage: Storage;

  public constructor(storage = globalThis.localStorage) {
    this.storage = storage;
  }

  public getItem<T>(key: string, defaultValueProvider: () => T): T {
    const { storage } = this;
    const serializedValue = storage.getItem(key);
    try {
      return serializedValue
        ? (JSON.parse(serializedValue) as T)
        : defaultValueProvider();
    } catch (e) {
      storage.removeItem(key);
      return defaultValueProvider();
    }
  }

  public setItem<T>(key: string, item: T): void {
    const { storage } = this;
    const serializedValue = JSON.stringify(item);
    storage.setItem(key, serializedValue);
  }
}

export default StorageService.instance;
