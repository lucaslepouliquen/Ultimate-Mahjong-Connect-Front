import { Component, inject, OnInit } from '@angular/core';
import { MahjongBoardService, PathValidationResponse } from '../../services/mahjong-board.service';
import { MahjongTileComponent } from '../mahjong-tile/mahjong-tile.component';
import { CommonModule } from '@angular/common';
import { LoggerService } from '../../services/logger.service';

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
  pathTiles: { row: number, col: number }[] = []; // Tuiles du chemin de validation
  showPath: boolean = false; // Afficher le chemin
  currentTurnRemovedTiles: { row: number, col: number }[] = []; // Tuiles supprimées ce tour
  private boardService = inject(MahjongBoardService)
  private logger = inject(LoggerService);

  ngOnInit(): void {
    this.loadBoard();
  }

  loadBoard(): void {
    this.logger.log('🎮 Loading board...');
    this.boardService.initializeDeterministic().subscribe((response) => {
      this.logger.log('🎮 Board response received:', response);
      if(response.data){
        this.board = response.data;
        this.logger.log(`🎮 Board loaded: ${this.board.length}x${this.board[0]?.length}`);
      }
      else{
        this.logger.error('🎮 Error loading board:', response.error);
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
      this.clearPath();
      return;
    }

    if (this.selectedTiles.length === 0) {
      this.clearPath();
      this.currentTurnRemovedTiles = []; 
    }

    this.selectedTiles.push({ row, col });

    if (this.selectedTiles.length === 2) {
      this.validateAndRemoveTiles();
    }

    if (this.selectedTiles.length > 2) {
      this.selectedTiles = [this.selectedTiles[this.selectedTiles.length - 1]];
      this.clearPath();
    }
  }

  private validateAndRemoveTiles(): void {
    if (this.selectedTiles.length !== 2) return;

    const [tile1, tile2] = this.selectedTiles;
    this.logger.log(`🎮 Validating move: (${tile1.row},${tile1.col}) -> (${tile2.row},${tile2.col})`);
    this.isProcessing = true;

    this.boardService.validateTilePath(tile1.row, tile1.col, tile2.row, tile2.col)
      .subscribe({
        next: (response) => {
          this.logger.log('Move validation response:', response);
          if (response.data && response.data.isValid && !response.error) {
            this.showValidationPath(response.data.path);
            
            setTimeout(() => {
              if (response.data.board) {
                this.board = response.data.board;
                this.logger.log('Valid path! Board updated from server.');
              } else {
                this.removeTiles(tile1, tile2);
                this.logger.log('Valid path! Tiles removed locally.');
              }
              this.clearPath();
              this.clearSelection();
              this.isProcessing = false;
              
              setTimeout(() => {
                this.currentTurnRemovedTiles = [];
                this.logger.log('🎮 Cleared currentTurnRemovedTiles');
              }, 1000);
            }, 2000);
          } else {
            this.logger.warn('Invalid path:', response.data?.message || response.error || 'No valid path found');
            this.clearPath();
            this.clearSelection();
            this.isProcessing = false;
          }
        },
        error: (err) => {
          this.logger.error('Error validating path:', err);
          this.clearPath();
          this.clearSelection();
          this.isProcessing = false;
        }
      });
  }

  private showValidationPath(path: any): void {
    this.logger.log('🎯 showValidationPath called with:', path);
    
    if (path && path.isValid && path.pathRows && path.pathColumns) {
      this.pathTiles = [];
      for (let i = 0; i < path.pathRows.length; i++) {
        this.pathTiles.push({
          row: path.pathRows[i],
          col: path.pathColumns[i]
        });
      }
      this.showPath = true;
      this.logger.log('🎯 Path tiles created:', this.pathTiles);
    } else {
      this.logger.warn('🎯 Invalid path data:', path);
    }
  }

  private clearPath(): void {
    this.pathTiles = [];
    this.showPath = false;
  }

  private removeTiles(tile1: { row: number, col: number }, tile2: { row: number, col: number }): void {
    if (this.board[tile1.row] && this.board[tile1.row][tile1.col]) {
      this.board[tile1.row][tile1.col].isRemoved = true;
      this.board[tile1.row][tile1.col].isMatched = true;
      this.currentTurnRemovedTiles.push(tile1);
      this.logger.log(`🎮 Added tile (${tile1.row},${tile1.col}) to currentTurnRemovedTiles`);
    }
    if (this.board[tile2.row] && this.board[tile2.row][tile2.col]) {
      this.board[tile2.row][tile2.col].isRemoved = true;
      this.board[tile2.row][tile2.col].isMatched = true;
      this.currentTurnRemovedTiles.push(tile2);
      this.logger.log(`🎮 Added tile (${tile2.row},${tile2.col}) to currentTurnRemovedTiles`);
    }
    this.logger.log(`🎮 currentTurnRemovedTiles now contains:`, this.currentTurnRemovedTiles);
  }

  private clearSelection(): void {
    this.selectedTiles = [];
  }

  isTileSelected(row: number, col: number): boolean {
    return this.selectedTiles.some(t => t.row === row && t.col === col);
  }

  isTileInPath(row: number, col: number): boolean {
    return this.showPath && this.pathTiles.some(t => t.row === row && t.col === col);
  }

  isTileRemovedThisTurn(row: number, col: number): boolean {
    const isRemoved = this.currentTurnRemovedTiles.some(t => t.row === row && t.col === col);
    if (isRemoved) {
      this.logger.log(`🎮 Tile (${row},${col}) has removal animation`);
    }
    return isRemoved;
  }

  resetBoard(): void {
    this.logger.log('🎮 Resetting board...');
    this.clearPath();
    this.clearSelection();
    this.currentTurnRemovedTiles = []; 
    this.isProcessing = true;
    
    this.boardService.resetBoard().subscribe({
      next: (response) => {
        this.logger.log('Reset response:', response);
        if (response.data && response.data.board) {
          this.board = response.data.board;
          this.logger.log('Board reset successfully');
        }
        this.isProcessing = false;
      },
      error: (err) => {
        this.logger.error('Error resetting board:', err);
        this.isProcessing = false;
      }
    });
  }
}
