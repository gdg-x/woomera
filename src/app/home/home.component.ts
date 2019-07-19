import { Component, OnInit } from '@angular/core';

import { MetaService } from '@services/meta.service';

@Component({
  selector: 'gdg-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private _meta: MetaService) { }

  ngOnInit() {
    this._meta.set();
  }
}
