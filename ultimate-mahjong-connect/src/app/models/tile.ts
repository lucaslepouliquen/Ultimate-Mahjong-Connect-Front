export interface Tile {
    category: MahjongTileCategory;
    value: number;
    isRemoved:boolean;
    isMatched: boolean;
    displayText: string;
}

export enum MahjongTileCategory {
  Bamboo = 1,
  Circles = 2,
  Characters = 3,
  Winds = 4,
  Dragons = 5,
  Flowers = 6,
  Seasons = 7
}