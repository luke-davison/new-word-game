export interface ShopLetter {
  id: string;
  position?: number;
  color: number;
  letter: string;
  price: number;
  points: number;
  ability?: Ability;
  isWild?: boolean;
}

export interface Ability {
  id: string;
  image: string;
  text: string;
  points?: number;
  multiplier?: number;
  getIsActive: (word: ShopLetter[], position: number) => boolean,
  getPoints: (word: ShopLetter[], position: number) => number
}