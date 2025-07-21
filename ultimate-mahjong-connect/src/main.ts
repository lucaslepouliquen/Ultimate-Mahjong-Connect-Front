import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppRootComponent } from './app/app-root.component';
import { LoggerService } from './app/services/logger.service';
import { inject } from '@angular/core';

bootstrapApplication(AppRootComponent, appConfig)
  .catch((err) => {
    const logger = inject(LoggerService);
    logger.error(err);
  });
