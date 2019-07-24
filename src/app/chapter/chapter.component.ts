import { Component, OnInit } from '@angular/core';
import * as fuzzysort from 'fuzzysort';
import { first } from 'rxjs/operators';

import { ChaptersService } from '@services/chapters.service';
import { MetaService } from '@services/meta.service';
import WoomeraTypes from '@types';

@Component({
  selector: 'gdg-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.scss']
})
export class ChapterComponent implements OnInit {
  private _chapters: WoomeraTypes.Chapter[] = [];
  private _filtered: WoomeraTypes.Chapter[] = [];
  private _total = 0;
  public name = '';

  constructor(private _cs: ChaptersService, private _meta: MetaService) { }

  ngOnInit() {
    this._meta.set({
      name: 'Chapters',
      description: 'Find an active GDG chapter near you. ' +
        'Visit each GDG’s page to find more information about the group, events, and sign-up details.'
    }, 'chapter');

    this._cs
      .find()
      .pipe(first())
      .subscribe((chapters: WoomeraTypes.Chapter[]) => {
        this._chapters = chapters;
        this._filtered = this._chapters;
        this._total = chapters.length;
      });
  }

  get filtered(): WoomeraTypes.Chapter[] {
    return this._filtered;
  }

  get total(): number {
    return this._total;
  }

  public search(query: string = ''): void {
    if (query.replace(/\s/g, '').length === 0) {
      this._filtered = this._chapters;
      return;
    }
    this._filtered = fuzzysort.go(query, this._chapters, {
      keys: ['name', 'city'],
      threshold: -10000
    }).map((r: any) => r.obj);
  }
}
