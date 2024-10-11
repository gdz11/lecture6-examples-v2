import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { SearchOptionsToken } from './shared/models/search-options';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    {
      provide: SearchOptionsToken,
      useValue: {
        enableLimits: false,
        maxItemCount: 2
      }
    },
  ]
};
