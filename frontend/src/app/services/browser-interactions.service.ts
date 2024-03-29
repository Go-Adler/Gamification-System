import { DOCUMENT } from '@angular/common'
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrowserInteractionsService {
  constructor( @Inject(DOCUMENT) private document: Document) { }

  
  getLocalStorageItem(key: string): string | null {
    const localStorage = this.document.defaultView?.localStorage;
    if (localStorage) return localStorage.getItem(key)
    return null
  }

  setLocalStorageItem(key: string, value: string): void {
    const localStorage = this.document.defaultView?.localStorage
    if (localStorage) localStorage.setItem(key, value)
  }

  clearLocalStorageItem(): void {
    const localStorage = this.document.defaultView?.localStorage
    if (localStorage) localStorage.clear()
  }
}
