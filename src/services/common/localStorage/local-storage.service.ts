import { Injectable } from '@angular/core';

@Injectable()
export class SkyLocalStorageService {
  private routeDataKey = 'route-data';
  prefix = 'sky-';


  get(key: string): any {
    return JSON.parse(localStorage.getItem(this.prefix + key));
  }

  set(key: string, value: any): void {
    localStorage.setItem(this.prefix + key, JSON.stringify(value));
  }

  del(key: string): void {
    localStorage.removeItem(this.prefix + key);
  }

  setRouteData(value: any) {
    this.set(this.routeDataKey, value);
  }

  getRouteData(): any {
    return this.get(this.routeDataKey);
  }
}
