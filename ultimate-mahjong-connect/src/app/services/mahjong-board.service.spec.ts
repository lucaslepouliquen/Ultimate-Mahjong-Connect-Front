import { TestBed } from '@angular/core/testing';
import { MahjongBoardService } from './mahjong-board.service';
import { HttpErrorService } from '@utilities/http-error.service';
import { mockMahjongBoard } from './mock-mahjong-board.service';
import {provideHttpClient } from '@angular/common/http';

describe('MahjongBoardService', () => {
  let service: MahjongBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    providers: [
      MahjongBoardService, 
      HttpErrorService,
      provideHttpClient(),
    ]
  });
    service = TestBed.inject(MahjongBoardService)
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
  });

  it('should initialize a random board', (done) => {
    service.initializeRandom().subscribe(response => {
      expect(response.data).toBeTruthy();
      expect(response.error).toBeUndefined();
      if(response.data.length > 0){
        expect(Array.isArray(response.data[0])).toBeTruthy();
      }
      done();
    });
  });
});