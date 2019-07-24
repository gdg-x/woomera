import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { SharedModule } from '@shared';

import { ChapterRoutingModule } from './chapter-routing.module';
import { ChapterComponent } from './chapter.component';
import { ViewChapterComponent } from './view-chapter/view-chapter.component';

@NgModule({
  declarations: [
    ChapterComponent,
    ViewChapterComponent
  ],
  imports: [
    CommonModule,
    ChapterRoutingModule,
    SharedModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule
  ]
})
export class ChapterModule { }
