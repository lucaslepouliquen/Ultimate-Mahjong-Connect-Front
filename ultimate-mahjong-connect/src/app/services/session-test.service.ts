import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { ApiConfigService } from './api-config.service';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class SessionTestService {
  private apiUrl: string;
  private http = inject(HttpClient);
  private apiConfig = inject(ApiConfigService);
  private logger = inject(LoggerService);

  constructor() {
    this.apiUrl = this.apiConfig.getBoardApiUrl();
  }

  testSessionCounter(): Observable<any> {
    this.logger.log('Testing session counter...');
    return this.http.get<any>(`${this.apiUrl}/test-session`, { withCredentials: true })
      .pipe(
        tap(response => this.logger.log('Session counter response:', response)),
        catchError(err => {
          this.logger.error('Session counter error:', err);
          return of({ error: err });
        })
      );
  }

  getDebugInfo(): Observable<any> {
    this.logger.log('�� Getting debug info...');
    return this.http.get<any>(`${this.apiUrl}/debug`, { withCredentials: true })
      .pipe(
        tap(response => this.logger.log('Debug info response:', response)),
        catchError(err => {
          this.logger.error('🧪 Debug info error:', err);
          return of({ error: err });
        })
      );
  }
} 