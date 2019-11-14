import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { AgmCoreModule } from '@agm/core';
import { InViewportModule } from 'ng-in-viewport';

import { SharedModule } from '@shared';

import { ChapterRoutingModule } from './chapter-routing.module';
import { ChapterComponent } from './chapter.component';
import { ViewChapterComponent } from './view-chapter/view-chapter.component';
import { ListChaptersComponent } from './list-chapters/list-chapters.component';
import { ChaptersMapComponent } from './chapters-map/chapters-map.component';
import { ViewEventComponent } from './view-event/view-event.component';

@NgModule({
  declarations: [
    ChapterComponent,
    ViewChapterComponent,
    ListChaptersComponent,
    ChaptersMapComponent,
    ViewEventComponent
  ],
  imports: [
    CommonModule,
    ChapterRoutingModule,
    FormsModule,
    SharedModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    AgmCoreModule,
    InViewportModule
  ]
})
export class ChapterModule { }
