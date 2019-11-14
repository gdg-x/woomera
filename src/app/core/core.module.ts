import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AngularFireModule, } from '@angular/fire';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { NgMetaModule } from 'ngmeta';

import { environment } from '@environment';

import { ChapterGuard } from '@guards/chapter.guard';
import { EventGuard } from '@guards/event.guard';

import { ChaptersService } from '@services/chapters.service';
import { LocationService } from '@services/location.service';
import { MetaService } from '@services/meta.service';
import { ToastService } from '@services/toast.service';

const PROVIDERS = [
  ChapterGuard,
  EventGuard,
  ChaptersService,
  LocationService,
  MetaService,
  ToastService
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MatSnackBarModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    NgMetaModule.forRoot()
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
