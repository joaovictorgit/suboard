import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storage: Storage;
  constructor() {
    this.storage = window.localStorage;
  }

  set(key: string, value: string) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  get(key: string) {
    if (this.storage) {
      let aux: any = this.storage.getItem(key);
      return JSON.parse(aux);
    }
    return null;
  }

  remove(key: string): boolean {
    if (this.storage) {
      this.storage.removeItem(key);
      return true;
    }
    return false;
  }

  clear(): boolean {
    if (this.storage) {
      this.storage.clear();
      return true;
    }
    return false;
  }
}
