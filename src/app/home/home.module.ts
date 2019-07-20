import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AgmCoreModule } from '@agm/core';

import { SharedModule } from '@shared';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { NearbyChaptersComponent } from './nearby-chapters/nearby-chapters.component';
import { ChaptersMapComponent } from './chapters-map/chapters-map.component';
import { OverviewComponent } from './overview/overview.component';
import { AboutComponent } from './about/about.component';
import { AllChaptersComponent } from './all-chapters/all-chapters.component';

@NgModule({
  declarations: [
    HomeComponent,
    NearbyChaptersComponent,
    ChaptersMapComponent,
    OverviewComponent,
    AboutComponent,
    AllChaptersComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    AgmCoreModule,
    SharedModule
  ]
})
export class HomeModule { }
