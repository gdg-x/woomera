import { Component, OnInit } from '@angular/core';
import * as fuzzysort from 'fuzzysort';
import { first } from 'rxjs/operators';

import { ChaptersService } from '@services/chapters.service';
import WoomeraTypes from '@types';

@Component({
  selector: 'gdg-all-chapters',
  templateUrl: './all-chapters.component.html',
  styleUrls: ['./all-chapters.component.scss']
})
export class AllChaptersComponent implements OnInit {
  private _chapters: WoomeraTypes.Chapter[] = [];
  private _filtered: WoomeraTypes.Chapter[] = [];
  private _total = 0;
  public name = '';

  constructor(private _cs: ChaptersService) {}

  ngOnInit() {
    this._cs
      .find()
      .pipe(first())
      .subscribe((chapters: WoomeraTypes.Chapter[]) => {
        this._chapters = this._shuffle(chapters);
        this._filtered = this._chapters;
        this._total = chapters.length;
      });
  }

  get filtered(): WoomeraTypes.Chapter[] {
    return this._filtered.slice(0, 6);
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

  private _shuffle(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
