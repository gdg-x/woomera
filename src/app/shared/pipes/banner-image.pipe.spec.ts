import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { inject, TestBed } from '@angular/core/testing';

import { BannerImagePipe } from './banner-image.pipe';

describe('BannerImagePipe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule]
    });
  });

  it('create an instance', inject(
    [DomSanitizer],
    (domSanitizer: DomSanitizer) => {
      const pipe = new BannerImagePipe(domSanitizer);
      expect(pipe).toBeTruthy();
    }
  ));
});
