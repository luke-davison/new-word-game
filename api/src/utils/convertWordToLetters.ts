import { ICampaignGame, IDailyGame, ILetter, IPlayer, ISubmitWord } from "../../../common/datamodels";

export const convertWordToLetters = (word: ISubmitWord["word"], game: ICampaignGame | IDailyGame, player: IPlayer | undefined): ILetter[] => {
  const inventory: ILetter[] = player?.inventory || []
  const memberLetters: ILetter[] = player?.isMember && "memberLetters" in game ? game.memberLetters : []
  const availableLetters = [...game.letters, ...inventory, ...memberLetters]

  const letters = word.map(({ id }) => availableLetters.find(letter => letter.id === id))

  return letters.filter(x => x) as ILetter[]
}