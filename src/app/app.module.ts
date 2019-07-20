import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutModule } from '@angular/cdk/layout';
import { AgmCoreModule } from '@agm/core';

import { CoreModule } from '@core';
import { environment } from '@environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    CoreModule.forRoot(),
    MatToolbarModule,
    MatSidenavModule,
    LayoutModule,
    AgmCoreModule.forRoot({
      apiKey: environment.firebase.apiKey
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
