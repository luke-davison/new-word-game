export interface ShopLetter {
  id: string;
  position: number;
  letter: string;
  price: number;
  points: number;
  ability?: Ability
}

export interface Ability {
  id: string;
  image: string;
  text: string;
  getIsActive: (word: ShopLetter[], position: number) => boolean,
  getPoints: (word: ShopLetter[], position: number) => number
}