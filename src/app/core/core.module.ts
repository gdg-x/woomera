import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AngularFireModule, } from '@angular/fire';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';

import { environment } from '@environment';

import { ChaptersService } from '@services/chapters.service';
import { LocationService } from '@services/location.service';
import { ToastService } from '@services/toast.service';

const PROVIDERS = [
  ChaptersService,
  LocationService,
  ToastService
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    MatSnackBarModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [
    { provide: FirestoreSettingsToken, useValue: {} }
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: PROVIDERS
    };
  }
}
