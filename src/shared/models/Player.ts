import { makeObservable, observable } from 'mobx'

import { IPlayer } from '../datamodels'
import { setupLetters } from '../utils/setupLetters'
import { Letter } from './Letter'

export class Player {

  data: IPlayer

  get userId() { return this.data.userId }

  constructor(data: IPlayer) {
    makeObservable(this, {
      inventory: observable
    })

    this.data = data
    this.inventory = setupLetters(this.data.inventory)
    this.funding = this.data.funding
    this.isMember = this.data.isMember
    this.points = this.data.points
  }

  funding: IPlayer['funding']
  inventory: Letter[] = []
  isMember: IPlayer['isMember']
  points: IPlayer['points']
}