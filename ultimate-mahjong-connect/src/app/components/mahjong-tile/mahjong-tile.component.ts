import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mahjong-tile',
  imports: [],
  templateUrl: './mahjong-tile.component.html',
  styleUrl: './mahjong-tile.component.css'
})
export class MahjongTileComponent {
  @Input() tile: any;
}
