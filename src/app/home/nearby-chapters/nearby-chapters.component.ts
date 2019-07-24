import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable, BehaviorSubject, Subscription, of } from 'rxjs';
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
export class NearbyChaptersComponent implements OnInit, OnDestroy {
  private _coordinates$: BehaviorSubject<firebase.firestore.GeoPoint> = new BehaviorSubject(new firebase.firestore.GeoPoint(0, 0));
  private _error = false;
  private _locationEnabledSubscription: Subscription;
  private _nearbyChapters$: Observable<WoomeraTypes.Chapter[]> = of();

  constructor(private _cs: ChaptersService, private _ls: LocationService, private _router: Router, private _toast: ToastService) { }

  ngOnInit() {
    this._locationEnabledSubscription = this.locationEnabled$.subscribe((enabled) => {
      if (enabled) {
        this.fetchChapters();
        this._locationEnabledSubscription.unsubscribe();
      }
    });
  }

  ngOnDestroy() {
    if (!this._locationEnabledSubscription.closed) { this._locationEnabledSubscription.unsubscribe(); }
  }

  get coordinates$(): Observable<firebase.firestore.GeoPoint> {
    return this._coordinates$.asObservable();
  }

  get error(): boolean {
    return this._error;
  }

  get locationEnabled$(): Observable<boolean> {
    return this._ls.locationEnabled$;
  }

  get nearbyChapters$(): Observable<WoomeraTypes.Chapter[]> {
    return this._nearbyChapters$;
  }

  public goToChapter(key: string): void {
    this._router.navigate(['/', 'chapter', key]);
  }

  public fetchChapters(): void {
    this._error = false;
    this._nearbyChapters$ = this._ls.getCurrentPosition().pipe(
      catchError(() => {
        this._error = true;
        this._toast.make('Couldn\'t find your location, do you have location disabled?');
        return of(null);
      }),
      mergeMap((coords: firebase.firestore.GeoPoint) => {
        if (coords) {
          this._coordinates$.next(coords);
          return this._cs.findNear(coords);
        }
        return of(null);
      })
    );
  }
}
