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
import { LayoutModule } from '@angular/cdk/layout';
import { AgmCoreModule } from '@agm/core';
import { InViewportModule } from 'ng-in-viewport';

import { SharedModule } from '@shared';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { NearbyChaptersComponent } from './nearby-chapters/nearby-chapters.component';
import { AboutComponent } from './about/about.component';
import { AllChaptersComponent } from './all-chapters/all-chapters.component';
import { WwdComponent } from './wwd/wwd.component';
import { AboutVideoComponent } from './about-video/about-video.component';

@NgModule({
  declarations: [
    HomeComponent,
    NearbyChaptersComponent,
    AboutComponent,
    AllChaptersComponent,
    WwdComponent,
    AboutVideoComponent
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
    LayoutModule,
    AgmCoreModule,
    InViewportModule,
    SharedModule
  ]
})
export class HomeModule { }
