import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface MahjongTile {
  category: number;
  value: number;
  isRemoved: boolean;
  isMatched: boolean;
  displayText: string;
}

@Injectable()
export class MahjongBoardServiceMock {
  constructor() { }
  
  initializeDeterministic(): Observable<MahjongTile[][]> {
    return of(this.mockBoardData);
  }
  
  private mockBoardData: MahjongTile[][] = [
    Array(14).fill({ category: 0, value: 0, isRemoved: true, isMatched: false, displayText: "" }),
    [
      { category: 0, value: 0, isRemoved: true, isMatched: false, displayText: "" },
      { category: 0, value: 1, isRemoved: false, isMatched: false, displayText: "[Bam-1]" },
      { category: 0, value: 1, isRemoved: false, isMatched: false, displayText: "[Bam-1]" },
      { category: 0, value: 2, isRemoved: false, isMatched: false, displayText: "[Bam-2]" },
      { category: 0, value: 2, isRemoved: false, isMatched: false, displayText: "[Bam-2]" },
      { category: 1, value: 1, isRemoved: false, isMatched: false, displayText: "[Cir-1]" },
      { category: 1, value: 1, isRemoved: false, isMatched: false, displayText: "[Cir-1]" },
      { category: 1, value: 2, isRemoved: false, isMatched: false, displayText: "[Cir-2]" },
      { category: 1, value: 2, isRemoved: false, isMatched: false, displayText: "[Cir-2]" },
      { category: 2, value: 1, isRemoved: false, isMatched: false, displayText: "[Cha-1]" },
      { category: 2, value: 1, isRemoved: false, isMatched: false, displayText: "[Cha-1]" },
      { category: 2, value: 2, isRemoved: false, isMatched: false, displayText: "[Cha-2]" },
      { category: 2, value: 2, isRemoved: false, isMatched: false, displayText: "[Cha-2]" },
      { category: 0, value: 0, isRemoved: true, isMatched: false, displayText: "" }
    ],
    
    [
      { category: 0, value: 0, isRemoved: true, isMatched: false, displayText: "" },
      { category: 3, value: 0, isRemoved: false, isMatched: false, displayText: "[Win-0]" },
      { category: 3, value: 0, isRemoved: false, isMatched: false, displayText: "[Win-0]" },
      { category: 3, value: 1, isRemoved: false, isMatched: false, displayText: "[Win-1]" },
      { category: 3, value: 1, isRemoved: false, isMatched: false, displayText: "[Win-1]" },
      { category: 4, value: 0, isRemoved: false, isMatched: false, displayText: "[Dra-0]" },
      { category: 4, value: 0, isRemoved: false, isMatched: false, displayText: "[Dra-0]" },
      { category: 4, value: 1, isRemoved: false, isMatched: false, displayText: "[Dra-1]" },
      { category: 4, value: 1, isRemoved: false, isMatched: false, displayText: "[Dra-1]" },
      { category: 5, value: 1, isRemoved: false, isMatched: false, displayText: "[Flo-1]" },
      { category: 5, value: 1, isRemoved: false, isMatched: false, displayText: "[Flo-1]" },
      { category: 6, value: 1, isRemoved: false, isMatched: false, displayText: "[Sea-1]" },
      { category: 6, value: 1, isRemoved: false, isMatched: false, displayText: "[Sea-1]" },
      { category: 0, value: 0, isRemoved: true, isMatched: false, displayText: "" }
    ],
    
    Array(11).fill(Array(14).fill({ category: 0, value: 0, isRemoved: true, isMatched: false, displayText: "" }))
  ];
}