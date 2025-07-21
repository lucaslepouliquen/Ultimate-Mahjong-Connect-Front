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

  it('should return the list of gamers', (done) => {
      const mockGamers = [
        { id: 1, pseudonyme: 'TestGamer', email: 'test@example.com' },
        { id: 2, pseudonyme: 'TestGamer2', email: 'test2@example.com' }
      ];

      service.getGamers().subscribe((response: any) => {
        expect(response.data).toBeTruthy();
        expect(response.error).toBeUndefined();
        expect(Array.isArray(response.data)).toBeTruthy();
        if(response.data.length > 0){
          response.data.forEach((gamer: any) => {
            expect(gamer).toBeTruthy();
            expect(gamer.pseudonyme).toBeTruthy();
          });
        }
        done();
      });

      const req = httpMock.expectOne(request => request.url.includes('/api/v1/gamers'));
      expect(req.request.method).toBe('GET');
      req.flush(mockGamers);
    });

  afterEach(() => {
    httpMock.verify();
  });
});
