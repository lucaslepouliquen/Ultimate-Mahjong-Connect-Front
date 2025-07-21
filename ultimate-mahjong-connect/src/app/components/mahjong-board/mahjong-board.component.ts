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
  selectedTiles: { row: number, col: number }[] = [];
  isProcessing: boolean = false;
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
    if (this.isProcessing || !this.board[row] || !this.board[row][col] || this.board[row][col].isRemoved) {
      return;
    }

    const existingIndex = this.selectedTiles.findIndex(t => t.row === row && t.col === col);
    if (existingIndex > -1) {
      this.selectedTiles.splice(existingIndex, 1);
      return;
    }

    this.selectedTiles.push({ row, col });

    if (this.selectedTiles.length === 2) {
      this.validateAndRemoveTiles();
    }

    if (this.selectedTiles.length > 2) {
      this.selectedTiles = [this.selectedTiles[this.selectedTiles.length - 1]];
    }
  }

  private validateAndRemoveTiles(): void {
    if (this.selectedTiles.length !== 2) return;

    const [tile1, tile2] = this.selectedTiles;
    this.isProcessing = true;

    this.boardService.validateTilePath(tile1.row, tile1.col, tile2.row, tile2.col)
      .subscribe({
        next: (response) => {
          if (response.data && !response.error) {
            this.removeTiles(tile1, tile2);
            console.log('Valid path! Tiles removed.');
          } else {
            console.log('Invalid path:', response.error || 'No valid path found');
          }
          this.clearSelection();
          this.isProcessing = false;
        },
        error: (err) => {
          console.error('Error validating path:', err);
          this.clearSelection();
          this.isProcessing = false;
        }
      });
  }

  private removeTiles(tile1: { row: number, col: number }, tile2: { row: number, col: number }): void {
    if (this.board[tile1.row] && this.board[tile1.row][tile1.col]) {
      this.board[tile1.row][tile1.col].isRemoved = true;
      this.board[tile1.row][tile1.col].isMatched = true;
    }
    if (this.board[tile2.row] && this.board[tile2.row][tile2.col]) {
      this.board[tile2.row][tile2.col].isRemoved = true;
      this.board[tile2.row][tile2.col].isMatched = true;
    }
  }

  private clearSelection(): void {
    this.selectedTiles = [];
  }

  isTileSelected(row: number, col: number): boolean {
    return this.selectedTiles.some(t => t.row === row && t.col === col);
  }
}
