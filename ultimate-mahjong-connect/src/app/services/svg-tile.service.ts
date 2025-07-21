import { Injectable } from '@angular/core';
import { MahjongTileCategory } from '../models/tile';

@Injectable({
  providedIn: 'root'
})
export class SvgTileService {

  constructor() { }

  getTileSvgPath(category: MahjongTileCategory, value: number): string {
    const categoryName = MahjongTileCategory[category].toLowerCase();
    return `assets/tile/${categoryName}/${value}.svg`;
  }

  getTileSvgContent(category: MahjongTileCategory, value: number): string {
    return this.getTileSvgPath(category, value);
  }

  ensureUtf8Encoding(content: string): string {
    return content;
  }
} 