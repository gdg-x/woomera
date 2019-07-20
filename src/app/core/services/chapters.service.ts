import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { GeoFirestore, GeoCollectionReference } from 'geofirestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import WoomeraTypes from '@types';

@Injectable({
  providedIn: 'root'
})
export class ChaptersService {
  private _chapters$: Observable<WoomeraTypes.Chapter[]>;
  private _collection: GeoCollectionReference;

  constructor(firestore: AngularFirestore, private _http: HttpClient) {
    const directoryUrl =
      'https://firebasestorage.googleapis.com/v0/b/withgdg.appspot.com/o/directory.json?alt=media';
    this._collection = new GeoFirestore(firestore.firestore).collection('chapters');
    this._chapters$ = _http.get(directoryUrl).pipe(
      map((result: WoomeraTypes.ChapterSimple[]) =>
        result.map((chapter: WoomeraTypes.ChapterSimple) => ({
          ...chapter,
          coordinates: new firebase.firestore.GeoPoint(
            chapter.coordinates.lat,
            chapter.coordinates.lng
          )
        }))
      )
    );
  }

  public about(key: string): Observable<any> {
    const url = 'https://api.meetup.com/' + key;
    return (typeof window !== 'undefined'
      ? this._http.jsonp(url, 'callback')
      : this._http.get(url)
    ).pipe(map((result: any) => (result.data ? result.data : result)));
  }

  public events(key: string): Observable<any> {
    const url = 'https://api.meetup.com/' + key + '/events';
    return (typeof window !== 'undefined'
      ? this._http.jsonp(url, 'callback')
      : this._http.get(url)
    ).pipe(map((result: any) => (result.data ? result.data : result)));
  }

  public find(): Observable<WoomeraTypes.Chapter[]> {
    return this._chapters$;
  }

  public findNear(
    center: firebase.firestore.GeoPoint,
    radius = 25
  ): Observable<WoomeraTypes.Chapter[]> {
    return from(
      this._collection
        .near({ center, radius })
        .get()
        .then((snapshot) => {
          return snapshot.docs
            .sort((a, b) => a.distance - b.distance)
            .map(doc => doc.data() as WoomeraTypes.Chapter);
        })
    );
  }

  public findOne(key: string): Observable<WoomeraTypes.Chapter> {
    return this._chapters$.pipe(
      map(chapters => chapters.find(chapter => chapter.$key === key))
    );
  }
}
