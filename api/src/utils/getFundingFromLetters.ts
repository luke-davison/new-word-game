import { ILetter } from '../../../shared/datamodels';
import { Abilities } from '../../../shared/enums/Abilities';

export const getFundingFromLetters = (letters: ILetter[]): number => {
  let funding: number = 0;

  letters.forEach(letter => {
    if (letter.ability === Abilities.Funding1) {
      funding += 1
    }

    if (letter.ability === Abilities.Funding2) {
      funding += 2
    }
  })

  return funding
}