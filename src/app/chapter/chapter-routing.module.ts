import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChapterGuard } from '@guards/chapter.guard';
import { EventGuard } from '@guards/event.guard';

import { ChapterComponent } from './chapter.component';
import { ViewChapterComponent } from './view-chapter/view-chapter.component';
import { ViewEventComponent } from './view-event/view-event.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: ChapterComponent },
  { path: ':chapter', component: ViewChapterComponent, canActivate: [ChapterGuard] },
  { path: ':chapter/events/:event', component: ViewEventComponent, canActivate: [ChapterGuard, EventGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChapterRoutingModule { }
