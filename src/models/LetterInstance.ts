import { action, makeObservable, observable } from 'mobx';

import { Abilities } from '../shared';
import { Letter } from '../shared/models/Letter';

let nextLetterInstanceId = 1

export class LetterInstance {

  id: string;
  parent: Letter
  position: number | undefined
  _char: string | undefined
  
  get letterId() { return this.parent.id }
  get color() { return this.parent.color }
  get char() { return this._char === undefined ? this.parent.char : this._char }
  get price() { return this.parent.price }
  get points() { return this.parent.points }
  get ability() { return this.parent.ability }
  get abilityPoints() { return this.parent.abilityPoints }
  get isWild() { return this.ability === Abilities.Wild }

  constructor(parent: Letter, position?: number) {
    makeObservable(this, {
      _char: observable,
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

  setWildLetter = (char: string) => {
    this._char = char
  }
}