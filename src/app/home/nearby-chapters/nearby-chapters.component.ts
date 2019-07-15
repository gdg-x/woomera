import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

import { ChaptersService } from '@services/chapters.service';
import { LocationService } from '@services/location.service';
import { ToastService } from '@services/toast.service';
import WoomeraTypes from '@types';

@Component({
  selector: 'gdg-nearby-chapters',
  templateUrl: './nearby-chapters.component.html',
  styleUrls: ['./nearby-chapters.component.scss']
})
export class NearbyChaptersComponent implements OnInit {
  private _nearbyChapters$: Observable<WoomeraTypes.Chapter[]> = of([]);

  constructor(private _chapters: ChaptersService, private _location: LocationService, private _toast: ToastService) { }

  ngOnInit() {
    this._nearbyChapters$ = this._location.getCurrentPosition().pipe(
      catchError((error) => {
        this._toast.make('Couldn\'t find your location');
        return of(new firebase.firestore.GeoPoint(0, 0));
      }),
      mergeMap((coords) => this._chapters.getNear(coords))
    );
  }

  get nearbyChapters$(): Observable<WoomeraTypes.Chapter[]> {
    return this._nearbyChapters$;
  }
}
