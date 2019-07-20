import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BannerImagePipe } from './pipes/banner-image.pipe';
import { InBrowserDirective } from './directives/in-browser.directive';

@NgModule({
  declarations: [
    BannerImagePipe,
    InBrowserDirective
  ],
  exports: [
    BannerImagePipe,
    InBrowserDirective
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
