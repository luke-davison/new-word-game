import { Abilities } from '../../enums'
import { getAbilityPoints } from './getAbilityPoints'

describe('getAbilityPoints', () => {
  describe('Abilities.CopyAbilityInPosition1', () => {
    it('copies inPosition abilities correctly - is in position', () => {
      const result = getAbilityPoints([
        { id: '1', char: 'a', price: 1, points: 1, ability: Abilities.InPosition2, abilityPoints: 3 },
        { id: '2', char: 't', price: 1, points: 1, ability: Abilities.CopyAbilityInPosition1 },
      ], 1)
      expect(result).toBe(3)
    })

    it('copies inPosition abilities correctly - is not in position', () => {
      const result = getAbilityPoints([
        { id: '1', char: 'a', price: 1, points: 1, ability: Abilities.InPosition3, abilityPoints: 3 },
        { id: '2', char: 't', price: 1, points: 1, ability: Abilities.CopyAbilityInPosition1 },
      ], 1)
      expect(result).toBe(0)
    })

    it('copies otherInPosition abilities correctly - 1', () => {
      const result = getAbilityPoints([
        { id: '1', char: 'a', price: 1, points: 4, ability: Abilities.OtherInPosition2 },
        { id: '2', char: 't', price: 1, points: 3, ability: Abilities.CopyAbilityInPosition1 },
      ], 1)
      expect(result).toBe(3)
    })

    it('copies otherInPosition abilities correctly - 2', () => {
      const result = getAbilityPoints([
        { id: '1', char: 'a', price: 1, points: 4, ability: Abilities.OtherInPosition1 },
        { id: '2', char: 't', price: 1, points: 3, ability: Abilities.CopyAbilityInPosition1 },
      ], 1)
      expect(result).toBe(4)
    })

    it('copies nextToVowel abilities correctly - 1', () => {
      const result = getAbilityPoints([
        { id: '1', char: 'a', price: 1, points: 4, ability: Abilities.NextToVowel, abilityPoints: 2 },
        { id: '2', char: 't', price: 1, points: 3, ability: Abilities.CopyAbilityInPosition1 },
      ], 1)
      expect(result).toBe(2)
    })

    it('copies nextToVowel abilities correctly - 2', () => {
      const result = getAbilityPoints([
        { id: '1', char: 't', price: 1, points: 4, ability: Abilities.NextToVowel, abilityPoints: 2 },
        { id: '2', char: 'a', price: 1, points: 3, ability: Abilities.CopyAbilityInPosition1 },
      ], 1)
      expect(result).toBe(0)
    })
  })
})