import { Component, Input } from '@angular/core';
import { Tile } from '../../models/tile';

@Component({
  selector: 'app-mahjong-tile',
  imports: [],
  templateUrl: './mahjong-tile.component.html',
  styleUrl: './mahjong-tile.component.css'
})
export class MahjongTileComponent {
  @Input() tile: undefined | Tile;
}

