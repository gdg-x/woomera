import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';

type Path = {
  name: string;
  link: string[];
  hideInNav?: boolean;
};

@Component({
  selector: 'gdg-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @ViewChild('drawer', { static: true }) drawer: MatSidenav;
  private _isHandset$: Observable<boolean> = this._breakpointObserver.observe(['(max-width: 599px)'])
    .pipe(map(result => result.matches));
  private _paths: Path[] = [
    { name: 'Home', link: ['/'], hideInNav: true },
    { name: 'Chapters', link: ['/', 'chapter'], hideInNav: false }
  ];

  constructor(private _breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
  }

  get isHandset$(): Observable<boolean> {
    return this._isHandset$;
  }

  get paths(): Path[] {
    return this._paths;
  }

  @HostListener('window:resize')
  public resize(): void {
    if (typeof window !== 'undefined' && window.innerWidth >= 601 && this.drawer.opened) {
      this.drawer.close();
    }
  }

  @HostListener('swiperight')
  public swiperight(): void {
    this._isHandset$.pipe(first()).subscribe((isHandset) => isHandset ? this.drawer.open() : null);
  }
}
