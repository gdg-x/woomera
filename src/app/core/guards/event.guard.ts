import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ChaptersService } from '@services/chapters.service';
import { ToastService } from '@services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class EventGuard implements CanActivate, CanActivateChild {
  constructor(private _cs: ChaptersService, private _router: Router, private _toast: ToastService) { }

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
    return this._cs.findEvent(next.params.chapter, next.params.event).pipe(
      map((event) => {
        if (!event || event.errors) { throw Error(); }
        return true;
      }),
      catchError(() => {
        this._toast.make('Event not found');
        this._router.navigate(['/', '404']);
        return of(false);
      })
    );
  }

  canActivateChild(next: ActivatedRouteSnapshot): Observable<boolean> {
    return this.canActivate(next);
  }
}
