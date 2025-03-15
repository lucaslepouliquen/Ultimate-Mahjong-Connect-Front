import { Component, Input, OnInit } from '@angular/core';
import { MahjongTileCategory, Tile } from '../../models/tile';
import { CommonModule } from '@angular/common';

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

  ngOnInit(): void {
    if(!this.tile){
      console.error('Tile is undefined');
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
        return 'assets/tile/Removed.png';
      }
      else{
        const category = MahjongTileCategory[this.tile.category].toLowerCase();
        return `assets/tile/${category}/${this.tile.value}.png`;
      }
    } 
    catch(e) {
      console.error('Error loading tile image:', e);
      return 'assets/tile/default.png';
    }

  }
}