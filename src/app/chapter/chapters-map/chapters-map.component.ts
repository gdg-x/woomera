import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import WoomeraTypes from '@types';

@Component({
  selector: 'gdg-chapters-map',
  templateUrl: './chapters-map.component.html',
  styleUrls: ['./chapters-map.component.scss']
})
export class ChaptersMapComponent implements OnInit {
  private _chapters: WoomeraTypes.Chapter[] = [];

  constructor(private _router: Router) {}

  ngOnInit() {
  }

  get chapters(): WoomeraTypes.Chapter[] {
    return this._chapters;
  }

  @Input() set chapters(chapters: WoomeraTypes.Chapter[]) {
    this._chapters = chapters;
  }

  public goToChapter(key: string): void {
    this._router.navigate(['/', 'chapter', key]);
  }

  public trackByFn(index: number, chapter: any): string {
    return chapter.$key;
  }
}
