import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {
  private readonly apiUrl: string;

  constructor() {
    this.apiUrl = this.getApiUrl();
  }

  private getApiUrl(): string {
    if (this.isDevMode()) {
      return 'https://localhost:7049';
    }
    
    return 'http://192.168.1.186:32698';
  }

  private isDevMode(): boolean {
    return window.location.hostname === 'localhost' || 
           window.location.hostname === '127.0.0.1' ||
           window.location.port === '4200';
  }

  getApiBaseUrl(): string {
    return this.apiUrl;
  }

  getGamerApiUrl(): string {
    return `${this.apiUrl}/api/Gamer`;
  }

  getBoardApiUrl(): string {
    return `${this.apiUrl}/api/v1/board`;
  }
} 