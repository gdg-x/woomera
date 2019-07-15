import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor() { }

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
}
