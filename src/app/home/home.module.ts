import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutModule } from '@angular/cdk/layout';
import { AgmCoreModule } from '@agm/core';
import { InViewportModule } from 'ng-in-viewport';

import { SharedModule } from '@shared';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { NearbyChaptersComponent } from './nearby-chapters/nearby-chapters.component';
import { AboutComponent } from './about/about.component';
import { WwdComponent } from './wwd/wwd.component';
import { AboutVideoComponent } from './about-video/about-video.component';

@NgModule({
  declarations: [
    HomeComponent,
    NearbyChaptersComponent,
    AboutComponent,
    WwdComponent,
    AboutVideoComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    LayoutModule,
    AgmCoreModule,
    InViewportModule,
    SharedModule
  ]
})
export class HomeModule { }
