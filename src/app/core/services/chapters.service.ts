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
    const directoryUrl = 'https://firebasestorage.googleapis.com/v0/b/withgdg.appspot.com/o/directory.json?alt=media';
    this._collection = new GeoFirestore(firestore.firestore).collection('chapters');
    this._chapters$ = _http.get(directoryUrl).pipe(
      map((result: WoomeraTypes.ChapterSimple[]) => result.map((chapter) => ({
        ...chapter,
        coordinates: new firebase.firestore.GeoPoint(chapter.coordinates.lat, chapter.coordinates.lng)
      })))
    );
  }

  public about(key: string): Observable<any> {
    return this._http.jsonp('https://api.meetup.com/' + key, 'callback').pipe(map((result: any) => result.data));
  }

  public events(key: string): Observable<any> {
    return this._http.jsonp('https://api.meetup.com/' + key + '/events', 'callback').pipe(map((result: any) => result.data));
  }

  public find(): Observable<WoomeraTypes.Chapter[]> {
    return this._chapters$;
  }

  public findNear(center: firebase.firestore.GeoPoint, radius = 25): Observable<WoomeraTypes.Chapter[]> {
    return from(this._collection.near({ center, radius }).get().then((snapshot) => {
      return snapshot.docs
        .sort((a, b) => a.distance - b.distance)
        .map((doc) => doc.data() as WoomeraTypes.Chapter);
    }));
  }

  public findOne(key: string): Observable<WoomeraTypes.Chapter> {
    return this._chapters$.pipe(map((chapters) => chapters.find((chapter) => chapter.$key === key)));
  }
}
