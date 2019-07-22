import { Component, OnInit } from '@angular/core';

import { MetaService } from '@services/meta.service';

@Component({
  selector: 'gdg-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public _isInViewport = false;

  constructor(private _meta: MetaService) { }

  ngOnInit() {
    this._meta.set();
  }

  get isInViewport(): boolean {
    return this._isInViewport;
  }

  public onIntersection({ target, visible }: { target: Element; visible: boolean }): void {
    this._isInViewport = this._isInViewport ? true : visible;
  }
}
