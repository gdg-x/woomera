import { TestBed, async, inject } from '@angular/core/testing';

import { ChapterGuard } from './chapter.guard';

describe('ChapterGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChapterGuard]
    });
  });

  it('should ...', inject([ChapterGuard], (guard: ChapterGuard) => {
    expect(guard).toBeTruthy();
  }));
});
