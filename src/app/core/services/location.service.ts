import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private _locationEnabled$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {
    this._watchLocationEnabled();
  }

  get locationEnabled$(): Observable<boolean> {
    return this._locationEnabled$.asObservable();
  }

  public getCurrentPosition(): Observable<firebase.firestore.GeoPoint> {
    return new Observable((observer) => {
      if ((typeof window !== 'undefined') && 'geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((success) => {
          observer.next(new firebase.firestore.GeoPoint(success.coords.latitude, success.coords.longitude));
          observer.complete();
        }, (error) => {
          observer.error(error);
        });
      } else {
        observer.error(new Error('Geolocation API unavailable'));
      }
    });
  }

  private _watchLocationEnabled(): void {
    if ((typeof window !== 'undefined') && 'permissions' in navigator) {
      // @ts-ignore
      navigator.permissions.query({name: 'geolocation'}).then((result) => {
        this._locationEnabled$.next(result.state === 'granted');
        const self = this;
        result.onchange = function() {
          self._locationEnabled$.next(this.state === 'granted');
        };
      }, () => {
        this._locationEnabled$.next(false);
      });
    } else {
      this._locationEnabled$.next(false);
    }
  }
}
