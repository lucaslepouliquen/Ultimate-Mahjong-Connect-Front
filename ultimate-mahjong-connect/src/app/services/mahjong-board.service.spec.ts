import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MahjongBoardService } from './mahjong-board.service';
import { HttpErrorService } from '@utilities/http-error.service';
import { mockMahjongBoard } from './mock-mahjong-board.service';

describe('MahjongBoardService', () => {
  let service: MahjongBoardService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MahjongBoardService, 
        HttpErrorService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(MahjongBoardService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize a deterministic board', (done) => {
    const mockTiles = mockMahjongBoard;

    service.initializeDeterministic().subscribe(response => {
      expect(response.data).toBeTruthy();
      expect(response.error).toBeUndefined();
      if(response.data.length > 0){
        expect(Array.isArray(response.data[0])).toBeTruthy();
        const deterministicBoard = response.data;
        expect(deterministicBoard.length).toEqual(mockTiles.length);  
        expect(deterministicBoard).toEqual(mockTiles);
      }
      done();
    });

    const req = httpMock.expectOne(request => request.url.includes('/api/v1/board'));
    expect(req.request.method).toBe('GET');
    req.flush(mockTiles);
  });

  it('should initialize a random board', (done) => {
    const mockTiles = mockMahjongBoard;

    service.initializeRandom().subscribe(response => {
      expect(response.data).toBeTruthy();
      expect(response.error).toBeUndefined();
      if(response.data.length > 0){
        expect(Array.isArray(response.data[0])).toBeTruthy();
      }
      done();
    });

    const req = httpMock.expectOne(request => request.url.includes('/api/v1/board'));
    expect(req.request.method).toBe('GET');
    req.flush(mockTiles);
  });

  afterEach(() => {
    httpMock.verify();
  });
});