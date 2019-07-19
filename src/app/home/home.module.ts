import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AgmCoreModule } from '@agm/core';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { NearbyChaptersComponent } from './nearby-chapters/nearby-chapters.component';
import { ChaptersMapComponent } from './chapters-map/chapters-map.component';
import { OverviewComponent } from './overview/overview.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    HomeComponent,
    NearbyChaptersComponent,
    ChaptersMapComponent,
    OverviewComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatProgressSpinnerModule,
    AgmCoreModule
  ]
})
export class HomeModule { }
