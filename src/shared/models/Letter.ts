import { action, makeObservable, observable } from 'mobx';

import { Abilities } from '../enums';

let nextLetterId = 1;

export interface IGameLetter {
  color: number;
  char: string;
  price: number;
  points: number;
  isWild?: boolean;
  ability?: Abilities;
  abilityPoints?: number;
}

export class Letter {

  id: string;
  data: IGameLetter
  limit: number | undefined

  get color() { return this.data.color }
  get char() { return this.data.char }
  get price() { return this.data.price }
  get points() { return this.data.points }
  get isWild() { return this.data.isWild }
  get ability() { return this.data.ability }
  get abilityPoints() { return this.data.abilityPoints}


  constructor(data: IGameLetter, limit?: number) {
    makeObservable(this, {
      limit: observable,
      onPlaceLetter: action,
      onUnplaceLetter: action
    })

    this.id = String(nextLetterId++)
    this.data = data
    this.limit = limit
  }

  onPlaceLetter = () => {
    if (this.limit !== undefined) {
      this.limit -= 1
    }
  }

  onUnplaceLetter = () => {
    if (this.limit !== undefined) {
      this.limit += 1
    }
  }
}
