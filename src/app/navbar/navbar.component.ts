import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'gdg-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private _isHandset$: Observable<boolean> = this._breakpointObserver.observe(['(max-width: 599px)'])
    .pipe(map(result => result.matches));

  constructor(private _breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
  }

  get isHandset$(): Observable<boolean> {
    return this._isHandset$;
  }
}
