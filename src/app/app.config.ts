import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { provideDateFnsAdapter } from '@angular/material-date-fns-adapter';
import { provideRouter } from '@angular/router';
import { provideApollo } from 'apollo-angular';
import { enUS } from 'date-fns/locale';

import { IconRegistryService } from '@core/services/icon-registry.service';

import { routes } from './app.routes';
import { createApollo } from './graphql.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideApollo(createApollo),
    // Use date-fns adapter with default configuration
    provideDateFnsAdapter(),
    // Provide the English locale for date-fns
    { provide: MAT_DATE_LOCALE, useValue: enUS },
    // Initialize icon registry service to register custom SVG icons
    provideAppInitializer(() => {
      inject(IconRegistryService).registerIcons();
      // Icons are registered in the service constructor
    }),
  ],
};
