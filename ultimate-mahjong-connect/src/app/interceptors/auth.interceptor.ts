import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoggerService } from '../services/logger.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const logger = inject(LoggerService);
  const token = authService.getToken();

  let modifiedReq = req.clone({
    setHeaders: {},
    withCredentials: true // Force l'inclusion des cookies pour toutes les requêtes
  });

  // Add authorization header if token exists
  if (token) {
    modifiedReq = modifiedReq.clone({
      headers: modifiedReq.headers.set('Authorization', `Bearer ${token}`)
    });
  }
  logger.log(`HTTP Request to ${modifiedReq.url} with credentials: ${modifiedReq.withCredentials}`);
  
  return next(modifiedReq);
}; 