import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BannerImagePipe } from './pipes/banner-image.pipe';

@NgModule({
  declarations: [
    BannerImagePipe
  ],
  exports: [
    BannerImagePipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
