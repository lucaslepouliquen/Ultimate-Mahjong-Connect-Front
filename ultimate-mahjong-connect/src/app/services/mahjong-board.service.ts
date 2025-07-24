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

export interface PlayableBoardResponse {
  message: string;
  board: Tile[][];
  difficulty: string;
  guaranteed: string;
}

export interface PathValidationResponse {
  isValid: boolean;
  path: {
    isValid: boolean;
    pathRows: number[];
    pathColumns: number[];
  };
  board?: Tile[][];
  message?: string;
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
  
    initializePlayable(): Observable<ServiceResponse<Tile[][]>>
    {
      this.logger.log('🎯 initializePlayable called');
      return this.http.get<PlayableBoardResponse>(`${this.apiUrl}/playable`, { withCredentials: true })
      .pipe(
        map(response => {
          this.logger.log('✅ Playable board response received:', response);
          this.logger.log('✅ Board dimensions:', response.board ? `${response.board.length}x${response.board[0]?.length}` : 'null');
          this.logger.log('✅ Difficulty:', response.difficulty);
          this.logger.log('✅ Guaranteed:', response.guaranteed);
          return { data: response.board };
        }),
        catchError(err => {
          this.logger.error('❌ Error in initializePlayable:', err);
          return of ({
            data: [[]],
            error: this.errorService.formatError(err)
          });
        })
      )
    }

    // Méthode de compatibilité - utilise maintenant /playable
    initializeDeterministic(): Observable<ServiceResponse<Tile[][]>> {
      return this.initializePlayable();
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

    validateTilePath(row1: number, col1: number, row2: number, col2: number): Observable<ServiceResponse<PathValidationResponse>>
    {
      const params = `?row1=${row1}&column1=${col1}&row2=${row2}&column2=${col2}`;
      this.logger.log(`validateTilePath called: (${row1},${col1}) -> (${row2},${col2})`);
      return this.http.get<PathValidationResponse>(`${this.apiUrl}/path${params}`, { withCredentials: true }).pipe(
        map(response => {
          this.logger.log('Path validation response:', response);
          return { data: response };
        }),
        catchError(err => {
          this.logger.error('Error in validateTilePath:', err);
          return of ({
            data: {
              isValid: false,
              path: {
                isValid: false,
                pathRows: [],
                pathColumns: []
              },
              message: this.errorService.formatError(err)
            },
            error: this.errorService.formatError(err)
          });
        })
      )
    }

    resetBoard(): Observable<ServiceResponse<any>>
    {
      this.logger.log('🎯 resetBoard called');
      return this.http.get<PlayableBoardResponse>(`${this.apiUrl}/playable`, { withCredentials: true })
      .pipe(
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
