import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay, withNoHttpTransferCache } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp, getApps, getApp } from '@angular/fire/app';
import { provideDatabase, getDatabase } from '@angular/fire/database';

import { environment } from './environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(withEventReplay(), withNoHttpTransferCache()),
    provideFirebaseApp(() => {
      // Check if Firebase app already exists
      const apps = getApps();
      if (apps.length === 0) {
        return initializeApp(environment.firebaseConfig);
      } else {
        return getApp(); // Return existing app
      }
    }),
    provideDatabase(() => getDatabase()),
  ]
};
