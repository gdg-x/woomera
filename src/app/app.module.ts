import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';

import { CoreModule } from '@core';
import { environment } from '@environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: environment.firebase.apiKey
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
