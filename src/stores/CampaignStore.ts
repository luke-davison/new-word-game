import { action, makeObservable, observable, runInAction } from 'mobx';

import { Player } from '../models';
import { LetterInstance } from '../models/LetterInstance';

export class CampaignStore {
  constructor(campaignId: string, campaignDay: number) {
    makeObservable(this, {
      player: observable,
      campaignId: observable,
      campaignDay: observable,
      onSubmit: action
    })

    this.campaignId = campaignId
    this.campaignDay = campaignDay
    this.player = {
      funding: 0,
      points: 0,
      isMember: false,
      inventory: []
    }
  }

  campaignId: string
  campaignDay: number
  player: Player

  onSubmit(word: LetterInstance[], money: number) {
    console.log('submitting')
    word.forEach((letter) => {
      if (letter.ability?.getEndOfGameEffect) {
        letter.ability?.getEndOfGameEffect(word, letter, this.player)
      }
    })

    this.campaignDay++
  }
}