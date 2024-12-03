import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes'; // Deine Routen importieren

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes), // Routen bereitstellen
  ],
};
