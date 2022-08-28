import { LetterInstance } from '../models/LetterInstance'
import { Letter } from '../shared'
import { IRawLetter } from '../shared/datamodels/IRawLetter'

export const convertWordToLetterInstances = (word: IRawLetter[], letters: Letter[]): LetterInstance[] => {
  const letterInstances = word.map(({ id, char }, index) => {
    const parent = letters.find(letter => letter.id === id)
    if (!parent) {
      return undefined
    }
    const letterInstance = new LetterInstance(parent, index)
    if (letterInstance.isWild) {
      letterInstance.setWildLetter(char)
    }

    return letterInstance
  })

  return letterInstances.filter(x => x) as LetterInstance[]
}