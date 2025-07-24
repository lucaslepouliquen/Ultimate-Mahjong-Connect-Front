import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';
import { ApiConfigService } from './api-config.service';
import { LoggerService } from './logger.service';

export interface AnonymousSession {
  sessionId: string;
  anonymousId: string;
  token: string;
  createdAt: string;
  lastActivity: string;
  isActive: boolean;
}

export interface AnonymousSessionResponse {
  message: string;
  data: AnonymousSession;
}

@Injectable({
  providedIn: 'root'
})
export class AnonymousSessionService {
  private http = inject(HttpClient);
  private apiConfig = inject(ApiConfigService);
  private logger = inject(LoggerService);
  
  private readonly ANONYMOUS_SESSION_KEY = 'mahjong_anonymous_session';
  
  private anonymousSessionSubject = new BehaviorSubject<AnonymousSession | null>(this.getStoredAnonymousSession());
  public anonymousSession$ = this.anonymousSessionSubject.asObservable();

  constructor() {
    // Vérifier si une session anonyme existe au démarrage
    const storedSession = this.getStoredAnonymousSession();
    if (storedSession) {
      this.validateAnonymousSession(storedSession.sessionId).subscribe({
        next: (isValid) => {
          if (!isValid) {
            this.logger.log('🗑️ Stored anonymous session is invalid, clearing...');
            this.clearAnonymousSession();
          }
        },
        error: (error) => {
          this.logger.error('❌ Error validating anonymous session:', error);
          this.clearAnonymousSession();
        }
      });
    }
  }

  /**
   * Create a new anonymous session
   */
  createAnonymousSession(): Observable<AnonymousSession> {
    this.logger.log('🎯 Creating anonymous session...');
    return this.http.post<AnonymousSessionResponse>(`${this.apiConfig.getApiBaseUrl()}/api/v1/auth/anonymous`, {})
      .pipe(
        map(response => response.data),
        tap(session => {
          this.logger.log('✅ Anonymous session created:', session);
          this.storeAnonymousSession(session);
          this.anonymousSessionSubject.next(session);
        })
      );
  }

  /**
   * Validate an anonymous session
   */
  validateAnonymousSession(sessionId: string): Observable<boolean> {
    return this.http.get<{ isValid: boolean; message: string }>(`${this.apiConfig.getApiBaseUrl()}/api/v1/auth/anonymous/validate/${sessionId}`)
      .pipe(
        map(response => response.isValid),
        tap(isValid => {
          this.logger.log('🔍 Session validation result:', isValid);
        })
      );
  }

  /**
   * Get anonymous session details
   */
  getAnonymousSession(sessionId: string): Observable<AnonymousSession> {
    return this.http.get<AnonymousSessionResponse>(`${this.apiConfig.getApiBaseUrl()}/api/v1/auth/anonymous/${sessionId}`)
      .pipe(
        map(response => response.data),
        tap(session => {
          this.logger.log('📋 Anonymous session details:', session);
        })
      );
  }

  /**
   * Delete an anonymous session
   */
  deleteAnonymousSession(sessionId: string): Observable<void> {
    this.logger.log('🗑️ Deleting anonymous session:', sessionId);
    return this.http.delete<void>(`${this.apiConfig.getApiBaseUrl()}/api/v1/auth/anonymous/${sessionId}`)
      .pipe(
        tap(() => {
          this.logger.log('✅ Anonymous session deleted');
          this.clearAnonymousSession();
        })
      );
  }

  /**
   * Get current anonymous session
   */
  getCurrentAnonymousSession(): AnonymousSession | null {
    return this.anonymousSessionSubject.value;
  }

  /**
   * Check if user has an anonymous session
   */
  hasAnonymousSession(): boolean {
    return this.getCurrentAnonymousSession() !== null;
  }

  /**
   * Get anonymous session token
   */
  getAnonymousToken(): string | null {
    const session = this.getCurrentAnonymousSession();
    return session?.token || null;
  }

  /**
   * Store anonymous session in localStorage
   */
  private storeAnonymousSession(session: AnonymousSession): void {
    localStorage.setItem(this.ANONYMOUS_SESSION_KEY, JSON.stringify(session));
  }

  /**
   * Get stored anonymous session from localStorage
   */
  private getStoredAnonymousSession(): AnonymousSession | null {
    const sessionJson = localStorage.getItem(this.ANONYMOUS_SESSION_KEY);
    if (!sessionJson) return null;
    
    try {
      return JSON.parse(sessionJson);
    } catch {
      return null;
    }
  }

  /**
   * Clear anonymous session
   */
  private clearAnonymousSession(): void {
    localStorage.removeItem(this.ANONYMOUS_SESSION_KEY);
    this.anonymousSessionSubject.next(null);
  }
} 