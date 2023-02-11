import { makeObservable, observable } from 'mobx'

import { IPlayer } from '../shared/datamodels'
import { setupLetters } from '../utils/setupLetters'
import { Letter } from './Letter'

export class Player {

  data: IPlayer

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