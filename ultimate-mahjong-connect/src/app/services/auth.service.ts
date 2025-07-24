import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, switchMap, of } from 'rxjs';
import { ApiConfigService } from './api-config.service';
import { AnonymousSessionService, AnonymousSession } from './anonymous-session.service';

export interface LoginRequest {
  usernameOrEmail: string;
  password: string;
}

export interface RegisterRequest {
  pseudonyme: string;
  email: string;
  password: string;
  age: number;
}

export interface AuthResponse {
  token: string;
  username: string;
  email: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiConfig = inject(ApiConfigService);
  private anonymousSessionService = inject(AnonymousSessionService);
  
  private readonly TOKEN_KEY = 'mahjong_jwt_token';
  private readonly USER_KEY = 'mahjong_user';
  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  private currentUserSubject = new BehaviorSubject<User | null>(this.getStoredUser());

  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Check if token exists and is valid on service initialization
    if (this.hasToken()) {
      this.verifyToken().subscribe({
        error: () => this.logout()
      });
    }
  }

  /**
   * Login with username/email and password
   */
  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiConfig.getApiBaseUrl()}/api/v1/auth/login`, credentials)
      .pipe(
        tap(response => {
          this.handleAuthSuccess(response);
          // Clear anonymous session when user logs in
          const anonymousSession = this.anonymousSessionService.getCurrentAnonymousSession();
          if (anonymousSession) {
            this.anonymousSessionService.deleteAnonymousSession(anonymousSession.sessionId).subscribe();
          }
        })
      );
  }

  /**
   * Register new user
   */
  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiConfig.getApiBaseUrl()}/api/v1/auth/register`, userData)
      .pipe(
        tap(response => {
          this.handleAuthSuccess(response);
          // Clear anonymous session when user registers
          const anonymousSession = this.anonymousSessionService.getCurrentAnonymousSession();
          if (anonymousSession) {
            this.anonymousSessionService.deleteAnonymousSession(anonymousSession.sessionId).subscribe();
          }
        })
      );
  }

  /**
   * Create anonymous session for users who want to play without registration
   */
  createAnonymousSession(): Observable<AnonymousSession> {
    return this.anonymousSessionService.createAnonymousSession();
  }

  /**
   * Get current anonymous session
   */
  getCurrentAnonymousSession(): AnonymousSession | null {
    return this.anonymousSessionService.getCurrentAnonymousSession();
  }

  /**
   * Check if user has an anonymous session
   */
  hasAnonymousSession(): boolean {
    return this.anonymousSessionService.hasAnonymousSession();
  }

  /**
   * Get current authentication token (JWT or anonymous)
   */
  getCurrentToken(): string | null {
    // First check for regular JWT token
    const jwtToken = this.getToken();
    if (jwtToken) return jwtToken;
    
    // Then check for anonymous session token
    return this.anonymousSessionService.getAnonymousToken();
  }

  /**
   * Check if user is authenticated (either with JWT or anonymous session)
   */
  isUserAuthenticated(): boolean {
    return this.hasToken() || this.hasAnonymousSession();
  }

  /**
   * Get anonymous session observable
   */
  getAnonymousSession$() {
    return this.anonymousSessionService.anonymousSession$;
  }

  /**
   * Check if user has a regular JWT token (not anonymous)
   */
  hasRegularToken(): boolean {
    return this.hasToken();
  }

  /**
   * Get current authentication status for display
   */
  getAuthStatus(): 'authenticated' | 'anonymous' | 'none' {
    if (this.hasToken()) return 'authenticated';
    if (this.hasAnonymousSession()) return 'anonymous';
    return 'none';
  }

  /**
   * Logout user
   */
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next(null);
    
    // Also clear anonymous session if exists
    const anonymousSession = this.anonymousSessionService.getCurrentAnonymousSession();
    if (anonymousSession) {
      this.anonymousSessionService.deleteAnonymousSession(anonymousSession.sessionId).subscribe();
    }
  }

  /**
   * Get current user info from server
   */
  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiConfig.getApiBaseUrl()}/api/v1/auth/me`);
  }

  /**
   * Get stored JWT token
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Check if user has a token
   */
  hasToken(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    // Check if token is expired
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000; // Convert to milliseconds
      return Date.now() < exp;
    } catch {
      return false;
    }
  }

  /**
   * Get current user from BehaviorSubject
   */
  getCurrentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Verify token with server
   */
  private verifyToken(): Observable<User> {
    return this.getCurrentUser().pipe(
      tap(user => this.currentUserSubject.next(user))
    );
  }

  /**
   * Handle successful authentication
   */
  private handleAuthSuccess(response: AuthResponse): void {
    localStorage.setItem(this.TOKEN_KEY, response.token);
    
    const user: User = {
      id: '', // Will be set when we get user details
      username: response.username,
      email: response.email
    };
    
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.isAuthenticatedSubject.next(true);
    this.currentUserSubject.next(user);
  }

  /**
   * Get stored user from localStorage
   */
  private getStoredUser(): User | null {
    const userJson = localStorage.getItem(this.USER_KEY);
    if (!userJson) return null;
    
    try {
      return JSON.parse(userJson);
    } catch {
      return null;
    }
  }
} 