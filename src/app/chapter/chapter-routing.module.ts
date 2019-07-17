import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChapterGuard } from '@guards/chapter.guard';

import { ChapterComponent } from './chapter.component';

const routes: Routes = [
  { path: ':key', component: ChapterComponent, canActivate: [ChapterGuard] },
  { path: '', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChapterRoutingModule { }
