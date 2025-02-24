import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { HttpErrorService } from '@utilities/http-error.service'; 
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MahjongBoardService {

  private apiUrl = 'http://localhost:7049/api/MahjongBoard'
    private http = inject(HttpClient)
    private errorService = inject(HttpErrorService)
  
    initializeDeterministic(): Observable<any> {
      return this.http.post(`${this.apiUrl}/Initialize/Deterministic`, {}).pipe(
        catchError(err => of ({
          data: [],
          error: this.errorService.formatError(err)
        }))
      )
    }
  
    initializeRandom(): Observable<any> {
      return this.http.post(`${this.apiUrl}/Initialize/Random`, {}).pipe(
        catchError(err => of ({
          data: [],
          error: this.errorService.formatError(err)
        }))
      )
    }
}
