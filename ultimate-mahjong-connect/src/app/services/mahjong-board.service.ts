import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { HttpErrorService } from '@utilities/http-error.service'; 
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Tile } from '../models/tile';
import { ApiConfigService } from './api-config.service';
import { LoggerService } from './logger.service';

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
  private logger: LoggerService;

  constructor() {
    this.apiUrl = this.apiConfig.getBoardApiUrl();
    this.logger = inject(LoggerService);
  }
  
    initializeDeterministic(): Observable<ServiceResponse<Tile[][]>>
    {
      this.logger.log('🎯 initializeDeterministic called');
      return this.http.get<Tile[][]>(`${this.apiUrl}?mode=deterministic`, { withCredentials: true })
      .pipe(
        map(board => {
          this.logger.log('✅ Board received:', board ? `${board.length}x${board[0]?.length}` : 'null');
          return { data: board };
        }),
        catchError(err => {
          this.logger.error('❌ Error in initializeDeterministic:', err);
          return of ({
            data: [[]],
            error: this.errorService.formatError(err)
          });
        })
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

    validateTilePath(row1: number, col1: number, row2: number, col2: number): Observable<ServiceResponse<any>>
    {
      const params = `?row1=${row1}&column1=${col1}&row2=${row2}&column2=${col2}`;
      this.logger.log(`validateTilePath called: (${row1},${col1}) -> (${row2},${col2})`);
      return this.http.get<any>(`${this.apiUrl}/path${params}`, { withCredentials: true }).pipe(
        map(response => {
          this.logger.log('Path validation response:', response);
          return { data: response };
        }),
        catchError(err => {
          this.logger.error('Error in validateTilePath:', err);
          return of ({
            data: null,
            error: this.errorService.formatError(err)
          });
        })
      )
    }

    resetBoard(): Observable<ServiceResponse<any>>
    {
      this.logger.log('🎯 resetBoard called');
      return this.http.post<any>(`${this.apiUrl}/reset`, {}, { withCredentials: true }).pipe(
        map(response => {
          this.logger.log('Reset board response:', response);
          return { data: response };
        }),
        catchError(err => {
          this.logger.error('Error in resetBoard:', err);
          return of ({
            data: null,
            error: this.errorService.formatError(err)
          });
        })
      )
    }
}
