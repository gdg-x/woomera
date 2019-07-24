import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChapterGuard } from '@guards/chapter.guard';

import { ChapterComponent } from './chapter.component';
import { ViewChapterComponent } from './view-chapter/view-chapter.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: ChapterComponent },
  { path: ':key', component: ViewChapterComponent, canActivate: [ChapterGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChapterRoutingModule { }
