import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'gdg-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  private _isHandset$: Observable<boolean> = this._breakpointObserver.observe(['(max-width: 599px)'])
    .pipe(map(result => result.matches));

  constructor(private _breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
  }

  get isHandset$(): Observable<boolean> {
    return this._isHandset$;
  }
}
