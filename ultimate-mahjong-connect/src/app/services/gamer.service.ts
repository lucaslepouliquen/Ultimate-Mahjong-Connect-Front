import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { HttpErrorService } from '@utilities/http-error.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = 'http://localhost:7049/api/Gamer'
  private http = inject(HttpClient)
  private errorService = inject(HttpErrorService)

  getGamers(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      catchError(err => of ({
        data: [],
        error: this.errorService.formatError(err)
      }))
    )
  }

  getGamerByPseudonyme(pseudonyme: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${pseudonyme}`).pipe(
      catchError(err => of ({
        data: [],
        error: this.errorService.formatError(err)
      }))
    )
  }
}

