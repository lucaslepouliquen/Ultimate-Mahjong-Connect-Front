import { TestBed } from '@angular/core/testing';

import { MahjongBoardService } from './mahjong-board.service';

describe('MahjongBoardService', () => {
  let service: MahjongBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MahjongBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
