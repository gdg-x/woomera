import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Pipe({
  name: 'bannerImage'
})
export class BannerImagePipe implements PipeTransform {
  constructor(private _sanitizer: DomSanitizer) { }

  transform(url: string): SafeStyle {
    return url ? this._sanitizer.bypassSecurityTrustStyle('url(' + url + ')') : null;
  }
}
