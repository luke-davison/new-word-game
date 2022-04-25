import { ICampaignGame, ILetter, IPlayer, ISubmitCampaignWord } from "../../../common/datamodels";

export const convertWordToLetters = (word: ISubmitCampaignWord["word"], campaignGame: ICampaignGame, player: IPlayer | undefined): ILetter[] => {
  const inventory: ILetter[] = player?.inventory || []
  const memberLetters: ILetter[] = player?.isMember ? campaignGame.memberLetters : []
  const availableLetters = [...campaignGame.letters, ...inventory, ...memberLetters]

  const letters = word.map(({ id }) => availableLetters.find(letter => letter.id === id))

  return letters.filter(x => x) as ILetter[]
}