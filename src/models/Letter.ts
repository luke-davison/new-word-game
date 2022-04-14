import { action, makeObservable, observable } from 'mobx';

import { Ability } from './';

let nextLetterId = 1;

export interface ILetter {
  color: number;
  letter: string;
  price: number;
  points: number;
  ability?: Ability;
  isWild?: boolean;
}

export class Letter {

  id: string;
  data: ILetter
  limit: number | undefined

  get color() { return this.data.color }
  get letter() { return this.data.letter }
  get price() { return this.data.price }
  get points() { return this.data.points }
  get ability() { return this.data.ability }
  get isWild() { return this.data.isWild }


  constructor(data: ILetter, limit?: number) {
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
