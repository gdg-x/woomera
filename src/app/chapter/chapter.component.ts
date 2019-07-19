import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ChaptersService } from '@services/chapters.service';
import { MetaService } from '@services/meta.service';

@Component({
  selector: 'gdg-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.scss']
})
export class ChapterComponent implements OnInit, OnDestroy {
  private _about: any;
  private _events: any;
  private _keySubscription: Subscription;

  constructor(private _cs: ChaptersService, private _meta: MetaService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._keySubscription = this._route.params.subscribe((params: any) => {
      this._cs.about(params.key).subscribe((about) => {
        this._meta.set(about, params.key);
        this._about = about;
      });
      this._cs.events(params.key).subscribe((events) => this._events = events);
    });
  }

  ngOnDestroy() {
    this._keySubscription.unsubscribe();
  }

  get about(): any {
    return this._about;
  }

  get events(): any {
    return this._events;
  }
}
