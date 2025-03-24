import { Component, inject, OnInit } from '@angular/core';
import { MahjongBoardService } from '../../services/mahjong-board.service';
import { MahjongTileComponent } from '../mahjong-tile/mahjong-tile.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, MahjongTileComponent],
  templateUrl: './mahjong-board.component.html',
  styleUrl: './mahjong-board.component.css'
})
export class BoardComponent implements OnInit {
  board: any[][] = [];
  selectedTiles: selectedTile[] = [];
  private boardService = inject(MahjongBoardService)

  ngOnInit(): void {
    this.loadBoard();
  }

  loadBoard(): void {
    this.boardService.initializeDeterministic().subscribe((response) => {
      if(response.data){
        this.board = response.data;
      }
      else{
        console.log('Error:', response.error);
      }
    });
  }

  selectTile(row: number, col: number): void {
    this.selectedTiles.push(new selectedTile(row, col));

    if(this.selectedTiles.length == 2){
      this.selectedTiles.splice(0, 2); 
    } 
  }
}

class selectedTile {
  row: number | undefined;
  column: number | undefined; 
  constructor(row: number, column: number) {
    this.row = row;
    this.column = column;
  }
}
