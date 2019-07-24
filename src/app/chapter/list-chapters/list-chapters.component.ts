import { Component, OnInit, Input } from '@angular/core';

import WoomeraTypes from '@types';

@Component({
  selector: 'gdg-list-chapters',
  templateUrl: './list-chapters.component.html',
  styleUrls: ['./list-chapters.component.scss']
})
export class ListChaptersComponent implements OnInit {
  private _chapters: WoomeraTypes.Chapter[] = [];

  constructor() {}

  ngOnInit() {
  }

  get chapters(): WoomeraTypes.Chapter[] {
    return this._chapters;
  }

  @Input() set chapters(chapters: WoomeraTypes.Chapter[]) {
    this._chapters = chapters;
  }

  public trackByFn(index: number, chapter: any): string {
    return chapter.$key;
  }
}
