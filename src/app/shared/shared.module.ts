import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BannerImagePipe } from './pipes/banner-image.pipe';
import { InBrowserDirective } from './directives/in-browser.directive';
import { AspectRatioDirective } from './directives/aspect-ratio.directive';

@NgModule({
  declarations: [
    BannerImagePipe,
    InBrowserDirective,
    AspectRatioDirective
  ],
  exports: [
    BannerImagePipe,
    InBrowserDirective,
    AspectRatioDirective
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
