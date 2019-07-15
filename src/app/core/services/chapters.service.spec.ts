import { TestBed } from '@angular/core/testing';

import { ChaptersService } from './chapters.service';

describe('ChaptersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChaptersService = TestBed.get(ChaptersService);
    expect(service).toBeTruthy();
  });
});
