export interface Tile {
    category: MahjongTileCategory;
    value: number;
    isRemoved:boolean;
    isMatched: boolean;
    displayText: string;
}

export enum MahjongTileCategory {
  Bamboo,
  Circles,
  Characters,
  Winds,
  Dragons,
  Flowers,
  Seasons
}