import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private querySignal = signal('');
  private isOpenSignal = signal(false);

  query = this.querySignal.asReadonly();
  isOpen = this.isOpenSignal.asReadonly();

  setQuery(value: string) {
    this.querySignal.set(value);
  }

  toggle() {
    this.isOpenSignal.update(v => !v);
  }

  open() {
    this.isOpenSignal.set(true);
  }

  close() {
    this.isOpenSignal.set(false);
  }
}
