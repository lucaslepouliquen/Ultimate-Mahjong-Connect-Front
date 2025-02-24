import { Component, inject, OnInit } from '@angular/core';
import { MahjongBoardService } from '../../services/mahjong-board.service';
import { HttpErrorService } from '@utilities/http-error.service';
import { MahjongTileComponent } from '../mahjong-tile/mahjong-tile.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, MahjongTileComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})

export class BoardComponent implements OnInit {
  private errorService = inject(HttpErrorService)
  board: any[][] = [];
  selectedTile: { row: number, col: number } | null = null;
  // 
  constructor(private boardService: MahjongBoardService) { }

  ngOnInit(): void {
    this.loadBoard();
  }

  loadBoard(): void {
    this.boardService.initializeDeterministic().subscribe((data) => {
      this.board = data;
    });
  }

  selectTile(row: number, col: number): void {
    if(!this.selectedTile){
      this.selectedTile = { row, col };
    } else {
      console.log('Selected tile:', this.selectedTile);
    }
  }
}
