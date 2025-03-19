import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { HttpErrorService } from '@utilities/http-error.service'; 
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Tile } from '../models/tile';

export interface ServiceResponse<T> {
  data: T;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})

export class MahjongBoardService {
  
  private apiUrl = 'https://localhost:7049/api/MahjongBoard'
    private http = inject(HttpClient)
    private errorService = inject(HttpErrorService)
  
    initializeDeterministic(): Observable<ServiceResponse<Tile[][]>>
    {
      return this.http.get<Tile[][]>(`${this.apiUrl}/board?mode=deterministic`, {})
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
      return this.http.get<Tile[][]>(`${this.apiUrl}/board?mode=random`, {}).pipe(
        map(board => ({ data: board })),
        catchError(err => of ({
          data: [[]],
          error: this.errorService.formatError(err)
        }))
      )
    }
}
