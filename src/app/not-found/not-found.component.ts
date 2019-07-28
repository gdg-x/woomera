import { Component, OnInit, Inject, Optional, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { Response } from 'express';
import { MetaService } from '@services/meta.service';

@Component({
  selector: 'gdg-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private _platformId: any,
    @Optional() @Inject(RESPONSE) private _response: Response,
    private _meta: MetaService
    ) { }

  ngOnInit() {
    this._meta.set({
      name: '404',
      description: 'Page not found...'
    }, '404');

    if (!isPlatformBrowser(this._platformId)) {
      this._response.status(404);
    }
  }
}
