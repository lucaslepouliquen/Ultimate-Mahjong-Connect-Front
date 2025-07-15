import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { HttpErrorService } from '@utilities/http-error.service'; 
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Tile } from '../models/tile';
import { ApiConfigService } from './api-config.service';

export interface ServiceResponse<T> {
  data: T;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})

export class MahjongBoardService {
  
  private apiUrl: string;
  private http = inject(HttpClient)
  private errorService = inject(HttpErrorService)
  private apiConfig = inject(ApiConfigService)

  constructor() {
    this.apiUrl = this.apiConfig.getBoardApiUrl();
  }
  
    initializeDeterministic(): Observable<ServiceResponse<Tile[][]>>
    {
      return this.http.get<Tile[][]>(`${this.apiUrl}?mode=deterministic`,{withCredentials: true})
      .pipe(
        map(board => ({ data: board })),
        catchError(err => of ({
          data: [[]],
          error: this.errorService.formatError(err)
        }))
      )
    }
  
    initializeRandom(): Observable<ServiceResponse<Tile[][]>> 
    {
      return this.http.get<Tile[][]>(`${this.apiUrl}?mode=random`, {withCredentials: true }).pipe(
        map(board => ({ data: board })),
        catchError(err => of ({
          data: [[]],
          error: this.errorService.formatError(err)
        }))
      )
    }
}
