import { Component, Input, OnInit } from '@angular/core';
import { MahjongTileCategory, Tile } from '../../models/tile';
import { CommonModule } from '@angular/common';
import { LoggerService } from '../../services/logger.service';
import { SvgTileService } from '../../services/svg-tile.service';

@Component({
  selector: 'app-mahjong-tile',
  imports: [CommonModule],
  templateUrl: './mahjong-tile.component.html',
  styleUrl: './mahjong-tile.component.css'
})
export class MahjongTileComponent implements OnInit {
  @Input() tile: undefined | Tile;
  @Input() category: MahjongTileCategory = MahjongTileCategory.Bamboo;
  @Input() value: number=0;
  @Input() isSelected: boolean=false;
  @Input() isRemoved: boolean=false;
  @Input() isMatched: boolean=false;
  @Input() displayText: string="";

  constructor(
    private logger: LoggerService,
    private svgTileService: SvgTileService
  ) {}

  ngOnInit(): void {
    if(!this.tile){
      this.logger.error('Tile is undefined');
    } else {
      this.category = this.category || this.tile.category;
      this.value = this.value || this.tile.value;
      this.isSelected = this.isSelected || this.tile.isMatched;
      this.isRemoved = this.isRemoved || this.tile.isRemoved;
      this.isMatched = this.isMatched || this.tile.isMatched;
      this.displayText = this.displayText || this.tile.displayText;
    }
  }

  getTileImagePath(): string {
     try {
      if(!this.tile || this.tile.isRemoved){
        return 'assets/tile/undefined.svg';
      }
      else{
        const category = MahjongTileCategory[this.category].toString().toLowerCase();
        var offset = 1;
        return `assets/tile/${category}/${this.tile.value + offset}.svg`;
      }
    } 
    catch(e) {
      this.logger.error('Error loading tile image:', e);
      return 'assets/tile/undefined.svg';
    }
  }

  onImageError(event: any): void {
    this.logger.error('Failed to load tile image:', event.target.src);
    // Fallback vers une image par défaut
    event.target.src = 'assets/tile/undefined.svg';
  }
}