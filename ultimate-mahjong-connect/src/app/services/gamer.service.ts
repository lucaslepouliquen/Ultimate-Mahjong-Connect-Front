import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, map } from 'rxjs';
import { HttpErrorService } from '@utilities/http-error.service';
import { Gamer } from '../models/gamer';
import { ApiConfigService } from './api-config.service';


export interface ServiceResponse<T> {
  data : T;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})

export class GameService {
  private apiUrl: string;
  private http = inject(HttpClient)
  private errorService = inject(HttpErrorService)
  private apiConfig = inject(ApiConfigService)

  constructor() {
    this.apiUrl = this.apiConfig.getGamerApiUrl();
  }

  getGamers(): Observable<ServiceResponse<Gamer[]>> {
    return this.http.get<Gamer[]>(this.apiUrl,{withCredentials: true })
    .pipe(
      map(gamers => ({ data: gamers })),
      catchError(err => of ({
        data: [],
        error: this.errorService.formatError(err)
      }))
    )
  }

  getGamerByPseudonyme(pseudonyme: string): Observable<any> {
    return this.http.get<Gamer>(`${this.apiUrl}/${pseudonyme}`,{withCredentials: true }).pipe(
      map(gamer => ({ data: gamer })),
      catchError(err => of ({
        data: [],
        error: this.errorService.formatError(err)
      }))
    )
  }
}

