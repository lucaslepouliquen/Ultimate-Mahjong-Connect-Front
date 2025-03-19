import { TestBed } from '@angular/core/testing';

import { GameService } from './gamer.service';
import { HttpErrorService } from '@utilities/http-error.service';
import { provideHttpClient } from '@angular/common/http';

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GameService,
        HttpErrorService,
        provideHttpClient(),]
    });
    service = TestBed.inject(GameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the list of gamers', (done) => {
      service.getGamers().subscribe(response => {
        expect(response.data).toBeTruthy();
        expect(response.error).toBeUndefined();
        expect(Array.isArray(response.data)).toBeTruthy();
        if(response.data.length > 0){
          response.data.forEach(gamer => {
            expect(gamer).toBeTruthy();
            expect(gamer.pseudonyme).toBeTruthy();
          });
        }
        done();
      });
    });
});
