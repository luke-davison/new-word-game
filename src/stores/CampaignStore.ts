import { action, makeObservable, observable } from 'mobx';
import { Player } from 'shared/models';
import { LetterInstance } from 'shared/models/LetterInstance';

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
    this.player = new Player({
      userId: "1",
      startDate: "2022-04-23",
      funding: 0,
      points: 0,
      isMember: false,
      inventory: [],
      endDate: "",
      lastSubmit: ""
    })
  }

  campaignId: string
  campaignDay: number
  player: Player

  onSubmit(word: LetterInstance[], points: number) {
    word.forEach((letter) => {
      if (letter.ability?.getEndOfGameEffect) {
        letter.ability?.getEndOfGameEffect(word, letter, this.player)
      }
    })

    this.player.points += points

    this.campaignDay++
  }
}