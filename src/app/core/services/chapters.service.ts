import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { GeoFirestore, GeoCollectionReference } from 'geofirestore';
import { Observable, from } from 'rxjs';

import WoomeraTypes from '@types';

@Injectable({
  providedIn: 'root'
})
export class ChaptersService {
  private _collection: GeoCollectionReference;

  constructor(firestore: AngularFirestore) {
    this._collection = new GeoFirestore(firestore.firestore).collection('chapters');
  }

  public getNear(center: firebase.firestore.GeoPoint, radius = 10): Observable<WoomeraTypes.Chapter[]> {
    return from(this._collection.near({ center, radius }).get().then((snapshot) => {
      return snapshot.docs
        .sort((a, b) => a.distance - b.distance)
        .map((doc) => doc.data() as WoomeraTypes.Chapter);
    }));
  }
}
