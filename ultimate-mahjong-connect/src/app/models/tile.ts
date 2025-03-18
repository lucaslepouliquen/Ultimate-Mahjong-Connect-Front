export interface Tile {
    category: MahjongTileCategory;
    value: number;
    isRemoved:boolean;
    isMatched: boolean;
    displayText: string;
}

export enum MahjongTileCategory {
  Bamboo = 0,
  Circles = 1,
  Characters = 2,
  Winds = 3,
  Dragons = 4,
  Flowers = 5,
  Seasons = 6
}