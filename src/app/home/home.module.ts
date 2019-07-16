import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NearbyChaptersComponent } from './nearby-chapters/nearby-chapters.component';

@NgModule({
  declarations: [
    HomeComponent,
    NearbyChaptersComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatProgressSpinnerModule
  ]
})
export class HomeModule { }
