import { action, makeObservable, observable } from 'mobx';

import { ILetter } from '../datamodels';
import { Abilities } from '../enums';

let nextLetterId = 1;

export interface IGameLetter extends ILetter {
  color: number;
}

export class Letter {

  data: IGameLetter
  limit: number | undefined

  get id() { return this.data.id }
  get color() { return this.data.color }
  get char() { return this.data.char }
  get price() { return this.data.price }
  get points() { return this.data.points }
  get ability() { return this.data.ability }
  get abilityPoints() { return this.data.abilityPoints}

  constructor(data: IGameLetter, limit?: number) {
    makeObservable(this, {
      limit: observable,
      onPlaceLetter: action,
      onUnplaceLetter: action
    })

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
