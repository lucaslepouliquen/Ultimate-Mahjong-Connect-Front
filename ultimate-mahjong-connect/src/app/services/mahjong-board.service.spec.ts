import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MahjongBoardService } from './mahjong-board.service';
import { HttpErrorService } from '@utilities/http-error.service';
import { Tile, MahjongTileCategory  } from '../models/tile';
import { mockMahjongBoard } from './mock-mahjong-board.service';

describe('MahjongBoardService', () => {
  let service: MahjongBoardService;
  let httpMock: HttpTestingController;
  let errorService: HttpErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MahjongBoardService, HttpErrorService]
    });
    service = TestBed.inject(MahjongBoardService);
    httpMock = TestBed.inject(HttpTestingController);
    errorService = TestBed.inject(HttpErrorService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize a deterministic board', () => {
    const mockTiles = mockMahjongBoard;

    service.initializeDeterministic().subscribe(response => {
      expect(response.data).toEqual(mockTiles);
      expect(response.error).toBeUndefined();
    });

    const req = httpMock.expectOne('http://localhost:7049/api/MahjongBoard/Initialize/Deterministic');
    expect(req.request.method).toBe('POST');
    req.flush(mockTiles);
  });

  it('should initialize a random board', () => {
    service.initializeRandom().subscribe(response => {
      expect(response.error).toBeUndefined();
    });

    const req = httpMock.expectOne('http://localhost:7049/api/MahjongBoard/Initialize/Random');
    expect(req.request.method).toBe('POST');
  });
});
