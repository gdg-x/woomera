import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ChaptersService } from '@services/chapters.service';
import { LocationService } from '@services/location.service';
import WoomeraTypes from '@types';

@Component({
  selector: 'gdg-chapters-map',
  templateUrl: './chapters-map.component.html',
  styleUrls: ['./chapters-map.component.scss']
})
export class ChaptersMapComponent implements OnInit {
  private _chapters$: Observable<WoomeraTypes.Chapter[]>;
  private _coordinates$: Observable<firebase.firestore.GeoPoint>;

  constructor(cs: ChaptersService, ls: LocationService, private _router: Router) {
    this._chapters$ = cs.find();
    this._coordinates$ = ls.getCurrentPosition().pipe(
      catchError(() => of(new firebase.firestore.GeoPoint(0, 0)))
    );
  }

  ngOnInit() {
  }

  get chapters$(): Observable<WoomeraTypes.Chapter[]> {
    return this._chapters$;
  }

  get coordinates$(): Observable<firebase.firestore.GeoPoint> {
    return this._coordinates$;
  }

  public goToChapter(key: string): void {
    this._router.navigate(['/', 'chapter', key]);
  }
}
