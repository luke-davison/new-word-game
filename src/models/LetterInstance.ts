import { action, makeObservable, observable } from 'mobx';

import { Letter } from './Letter';

let nextLetterInstanceId = 1

export class LetterInstance {

  id: string;
  parent: Letter
  position: number | undefined
  _letter: string | undefined
  
  get color() { return this.parent.color }
  get letter() { return this._letter === undefined ? this.parent.letter : this._letter }
  get price() { return this.parent.price }
  get points() { return this.parent.points }
  get ability() { return this.parent.ability }
  get isWild() { return this.parent.isWild }

  constructor(parent: Letter, position?: number) {
    makeObservable(this, {
      _letter: observable,
      position: observable,
      setPosition: action,
      setWildLetter: action
    })

    this.id = String(nextLetterInstanceId++)
    this.parent = parent
    this.position = position
  }

  setPosition = (position?: number | undefined) => {
    this.position = position
  }

  setWildLetter = (letter: string) => {
    this._letter = letter
  }
}