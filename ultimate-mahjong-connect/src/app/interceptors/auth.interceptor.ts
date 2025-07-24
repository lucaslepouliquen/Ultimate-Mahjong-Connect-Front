import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoggerService } from '../services/logger.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const logger = inject(LoggerService);
  
  // Get current token (JWT or anonymous)
  const token = authService.getCurrentToken();

  let modifiedReq = req.clone({
    setHeaders: {},
    withCredentials: true // Force l'inclusion des cookies pour toutes les requêtes
  });

  // Add authorization header if token exists (JWT or anonymous)
  if (token) {
    modifiedReq = modifiedReq.clone({
      headers: modifiedReq.headers.set('Authorization', `Bearer ${token}`)
    });
    logger.log(`HTTP Request to ${modifiedReq.url} with token: ${token.substring(0, 20)}...`);
  } else {
    logger.log(`HTTP Request to ${modifiedReq.url} without token`);
  }
  
  return next(modifiedReq);
}; 