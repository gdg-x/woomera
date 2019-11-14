import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ChaptersService } from '@services/chapters.service';
import { MetaService } from '@services/meta.service';

@Component({
  selector: 'gdg-view-chapter',
  templateUrl: './view-chapter.component.html',
  styleUrls: ['./view-chapter.component.scss']
})
export class ViewChapterComponent implements OnInit, OnDestroy {
  private _about: any;
  private _chapter: string;
  private _events: any[] = [];
  private _paramSubscription: Subscription;

  constructor(private _cs: ChaptersService, private _meta: MetaService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._paramSubscription = this._route.params.subscribe({
      next: (params: any) => {
        this._chapter = params.chapter;
        this._cs.about(this._chapter).subscribe({
          next: (about) => {
            this._meta.set({
              ...about,
              name: `${about.name} | With GDG`
            }, this._chapter);
            this._about = about;
          }
        });
        this._cs.events(this._chapter).subscribe({
          next: (events) => this._events = events
        });
      }
    });
  }

  ngOnDestroy() {
    this._paramSubscription.unsubscribe();
  }

  get about(): any {
    return this._about;
  }

  get chapter(): string {
    return this._chapter;
  }

  get events(): any[] {
    return this._events;
  }
}
