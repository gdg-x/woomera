import { Component, OnInit } from '@angular/core';
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
  private _nearbyChapters$: Observable<WoomeraTypes.Chapter[]> = of();
  private _error = false;

  constructor(private _cs: ChaptersService, private _ls: LocationService, private _toast: ToastService) { }

  ngOnInit() {
    this.fetchChapters();
  }

  get error(): boolean {
    return this._error;
  }

  get nearbyChapters$(): Observable<WoomeraTypes.Chapter[]> {
    return this._nearbyChapters$;
  }

  public fetchChapters(): void {
    this._error = false;
    this._nearbyChapters$ = this._ls.getCurrentPosition().pipe(
      catchError(() => {
        this._error = true;
        this._toast.make('Couldn\'t find your location');
        return of(null);
      }),
      mergeMap((coords) => (coords) ? this._cs.findNear(coords) : of(null))
    );
  }
}
