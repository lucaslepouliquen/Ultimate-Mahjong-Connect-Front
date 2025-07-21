import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { GameService } from './gamer.service';
import { HttpErrorService } from '@utilities/http-error.service';

describe('GameService', () => {
  let service: GameService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GameService,
        HttpErrorService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(GameService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the list of gamers', () => {
      const mockData = [
        { id: 1, pseudonyme: 'Player1' },
        { id: 2, pseudonyme: 'Player2' }
      ];

      service.getGamers().subscribe(response => {
        expect(response).toBeDefined();
        expect(response.data).toBeDefined();
        expect(Array.isArray(response.data)).toBe(true);
        expect(response.error).toBeUndefined();
      });

      const req = httpMock.expectOne(() => true);
      expect(req.request.method).toBe('GET');
      req.flush(mockData);
    });

  afterEach(() => {
    httpMock.verify();
  });
});
