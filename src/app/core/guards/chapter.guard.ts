import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ChaptersService } from '@services/chapters.service';
import { ToastService } from '@services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class ChapterGuard implements CanActivate, CanActivateChild {
  constructor(private _cs: ChaptersService, private _router: Router, private _toast: ToastService) { }

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
    return this._cs.findOne(next.params.key).pipe(
      map((chapter) => {
        if (!chapter) { throw Error(); }
        return true;
      }),
      catchError(() => {
        this._toast.make('Chapter not found');
        this._router.navigate(['/', 'chapter']);
        return of(false);
      })
    );
  }

  canActivateChild(next: ActivatedRouteSnapshot): Observable<boolean> {
    return this.canActivate(next);
  }
}
