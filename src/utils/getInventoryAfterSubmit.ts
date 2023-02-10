import { ILetter } from '../../client/src/shared/datamodels'
import { Abilities } from '../../client/src/shared/enums'

export const getInventoryAfterSubmit = (letters: ILetter[], inventory: ILetter[] = []): ILetter[] => {
  const unusedInventory = inventory.filter(inventoryLetter => !letters.some(letter => letter.id === inventoryLetter.id))

  const retainedLetters = letters.filter((letter, position) => {
    if (letter.ability === Abilities.Retain) {
      return true
    }

    if (position > 0 && letters[position - 1].ability === Abilities.RetainRight) {
      return true
    }

    if (position < letters.length - 1 && letters[position + 1].ability === Abilities.RetainLeft) {
      return true
    }

    return false
  })

  return [...unusedInventory, ...retainedLetters]
}