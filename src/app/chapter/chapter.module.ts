import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

import { SharedModule } from '@shared';

import { ChapterRoutingModule } from './chapter-routing.module';
import { ChapterComponent } from './chapter.component';

@NgModule({
  declarations: [
    ChapterComponent
  ],
  imports: [
    CommonModule,
    ChapterRoutingModule,
    SharedModule,
    MatButtonModule,
    MatCardModule,
    MatListModule
  ]
})
export class ChapterModule { }
