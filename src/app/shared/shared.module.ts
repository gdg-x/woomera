import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BannerImagePipe } from './pipes/banner-image.pipe';
import { InBrowserDirective } from './directives/in-browser.directive';
import { AspectRatioDirective } from './directives/aspect-ratio.directive';
import { MapsLinkPipe } from './pipes/maps-link.pipe';

@NgModule({
  declarations: [
    BannerImagePipe,
    InBrowserDirective,
    AspectRatioDirective,
    MapsLinkPipe
  ],
  exports: [
    BannerImagePipe,
    InBrowserDirective,
    AspectRatioDirective,
    MapsLinkPipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
