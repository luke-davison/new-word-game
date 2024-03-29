import { Abilities } from '../../enums'
import { getAbilityIsActive } from './getAbilityIsActive'

describe('getAbilityIsActive', () => {
  describe('Abilities.Club', () => {
    it('should always be true', () => {
      const result = getAbilityIsActive([
        { id: '1', char: 'a', price: 1, points: 1, ability: Abilities.Club }
      ], 0)
      expect(result).toBe(true)
    })
  })

  describe('Abilities.Funding1', () => {
    it('should always be true', () => {
      const result = getAbilityIsActive([
        { id: '1', char: 'a', price: 1, points: 1, ability: Abilities.Funding1 }
      ], 0)
      expect(result).toBe(true)
    })
  })

  describe('Abilities.Funding2', () => {
    it('should always be true', () => {
      const result = getAbilityIsActive([
        { id: '1', char: 'a', price: 1, points: 1, ability: Abilities.Funding2 }
      ], 0)
      expect(result).toBe(true)
    })
  })

  describe('Abilities.InPosition1', () => {
    it('should be true if in the first position', () => {
      const result = getAbilityIsActive([
        { id: '1', char: 'a', price: 1, points: 1, ability: Abilities.InPosition1 }
      ], 0)
      expect(result).toBe(true)
    })

    it('should be false if in a different position', () => {
      const result = getAbilityIsActive([
        { id: '1', char: 'a', price: 1, points: 1 },
        { id: '2', char: 't', price: 1, points: 1, ability: Abilities.InPosition1 }
      ], 1)
      expect(result).toBe(false)
    })
  })

  describe('Abilities.InPosition2', () => {
    it('should be true if in the seond position', () => {
      const result = getAbilityIsActive([
        { id: '1', char: 'a', price: 1, points: 1 },
        { id: '2', char: 't', price: 1, points: 1, ability: Abilities.InPosition2 }
      ], 1)
      expect(result).toBe(true)
    })

    it('should be false if in a different position', () => {
      const result = getAbilityIsActive([
        { id: '1', char: 'a', price: 1, points: 1, ability: Abilities.InPosition2 },
        { id: '2', char: 't', price: 1, points: 1 }
      ], 0)
      expect(result).toBe(false)
    })
  })

  describe('Abilities.InPosition3', () => {
    it('should be true if in the third position', () => {
      const result = getAbilityIsActive([
        { id: '1', char: 'a', price: 1, points: 1 },
        { id: '2', char: 'n', price: 1, points: 1 },
        { id: '3', char: 'd', price: 1, points: 1, ability: Abilities.InPosition3 }
      ], 2)
      expect(result).toBe(true)
    })

    it('should be false if in a different position', () => {
      const result = getAbilityIsActive([
        { id: '1', char: 'a', price: 1, points: 1 },
        { id: '2', char: 'n', price: 1, points: 1, ability: Abilities.InPosition3 },
        { id: '3', char: 'd', price: 1, points: 1 }
      ], 1)
      expect(result).toBe(false)
    })
  })

  describe('Abilities.InPosition4', () => {
    it('should be true if in the fourth position', () => {
      const result = getAbilityIsActive([
        { id: '4', char: 's', price: 1, points: 1 },
        { id: '1', char: 'a', price: 1, points: 1 },
        { id: '2', char: 'n', price: 1, points: 1 },
        { id: '3', char: 'd', price: 1, points: 1, ability: Abilities.InPosition4 }
      ], 3)
      expect(result).toBe(true)
    })

    it('should be false if in a different position', () => {
      const result = getAbilityIsActive([
        { id: '4', char: 's', price: 1, points: 1 },
        { id: '1', char: 'a', price: 1, points: 1 },
        { id: '2', char: 'n', price: 1, points: 1, ability: Abilities.InPosition4 },
        { id: '3', char: 'd', price: 1, points: 1 }
      ], 2)
      expect(result).toBe(false)
    })
  })

  describe('Abilities.InPositionLast', () => {
    it('should be true if in the last position', () => {
      const result = getAbilityIsActive([
        { id: '4', char: 's', price: 1, points: 1 },
        { id: '1', char: 'a', price: 1, points: 1 },
        { id: '2', char: 'n', price: 1, points: 1 },
        { id: '3', char: 'd', price: 1, points: 1, ability: Abilities.InPositionLast }
      ], 3)
      expect(result).toBe(true)
    })

    it('should be false if in a different position', () => {
      const result = getAbilityIsActive([
        { id: '4', char: 's', price: 1, points: 1 },
        { id: '1', char: 'a', price: 1, points: 1, ability: Abilities.InPositionLast },
        { id: '2', char: 'd', price: 1, points: 1 }
      ], 2)
      expect(result).toBe(false)
    })
  })

  describe('Abilities.MaxWordLength4', () => {
    it('should be true if the word is fewer letters long', () => {
      const result = getAbilityIsActive([
        { id: '4', char: 's', price: 1, points: 1, ability: Abilities.MaxWordLength4 },
        { id: '1', char: 'a', price: 1, points: 1 },
        { id: '2', char: 'd', price: 1, points: 1 }
      ], 0)
      expect(result).toBe(true)
    })

    it('should be true if the word is four letters long', () => {
      const result = getAbilityIsActive([
        { id: '4', char: 's', price: 1, points: 1, ability: Abilities.MaxWordLength4 },
        { id: '1', char: 'a', price: 1, points: 1 },
        { id: '3', char: 'n', price: 1, points: 1 },
        { id: '2', char: 'd', price: 1, points: 1 }
      ], 0)
      expect(result).toBe(true)
    })

    it('should be false if the word is greater letters long', () => {
      const result = getAbilityIsActive([
        { id: '4', char: 's', price: 1, points: 1, ability: Abilities.MaxWordLength4 },
        { id: '5', char: 't', price: 1, points: 1 },
        { id: '1', char: 'a', price: 1, points: 1 },
        { id: '3', char: 'n', price: 1, points: 1 },
        { id: '2', char: 'd', price: 1, points: 1 }
      ], 0)
      expect(result).toBe(false)
    })
  })

  describe('Abilities.MaxWordLength5', () => {
    it('should be true if the word is fewer letters long', () => {
      const result = getAbilityIsActive([
        { id: '4', char: 's', price: 1, points: 1, ability: Abilities.MaxWordLength5 },
        { id: '1', char: 'a', price: 1, points: 1 },
        { id: '3', char: 'n', price: 1, points: 1 },
        { id: '2', char: 'd', price: 1, points: 1 }
      ], 0)
      expect(result).toBe(true)
    })

    it('should be true if the word is five letters long', () => {
      const result = getAbilityIsActive([
        { id: '4', char: 's', price: 1, points: 1, ability: Abilities.MaxWordLength5 },
        { id: '5', char: 't', price: 1, points: 1 },
        { id: '1', char: 'a', price: 1, points: 1 },
        { id: '3', char: 'n', price: 1, points: 1 },
        { id: '2', char: 'd', price: 1, points: 1 }
      ], 0)
      expect(result).toBe(true)
    })

    it('should be false if the word is greater letters long', () => {
      const result = getAbilityIsActive([
        { id: '4', char: 's', price: 1, points: 1, ability: Abilities.MaxWordLength5 },
        { id: '5', char: 't', price: 1, points: 1 },
        { id: '1', char: 'a', price: 1, points: 1 },
        { id: '3', char: 'n', price: 1, points: 1 },
        { id: '2', char: 'd', price: 1, points: 1 },
        { id: '4', char: 's', price: 1, points: 1 }
      ], 0)
      expect(result).toBe(false)
    })
  })

  describe('Abilities.MaxWordLength6', () => {
    it('should be true if the word is fewer letters long', () => {
      const result = getAbilityIsActive([
        { id: '4', char: 's', price: 1, points: 1, ability: Abilities.MaxWordLength6 },
        { id: '5', char: 't', price: 1, points: 1 },
        { id: '1', char: 'a', price: 1, points: 1 },
        { id: '3', char: 'n', price: 1, points: 1 },
        { id: '2', char: 'd', price: 1, points: 1 }
      ], 0)
      expect(result).toBe(true)
    })

    it('should be true if the word is six letters long', () => {
      const result = getAbilityIsActive([
        { id: '4', char: 's', price: 1, points: 1, ability: Abilities.MaxWordLength6 },
        { id: '5', char: 't', price: 1, points: 1 },
        { id: '1', char: 'a', price: 1, points: 1 },
        { id: '3', char: 'n', price: 1, points: 1 },
        { id: '2', char: 'd', price: 1, points: 1 },
        { id: '4', char: 's', price: 1, points: 1 }
      ], 0)
      expect(result).toBe(true)
    })

    it('should be false if the word is greater letters long', () => {
      const result = getAbilityIsActive([
        { id: '4', char: 's', price: 1, points: 1, ability: Abilities.MaxWordLength6 },
        { id: '5', char: 't', price: 1, points: 1 },
        { id: '1', char: 'a', price: 1, points: 1 },
        { id: '3', char: 'n', price: 1, points: 1 },
        { id: '2', char: 'd', price: 1, points: 1 },
        { id: '6', char: 'e', price: 1, points: 1 },
        { id: '6', char: 'e', price: 1, points: 1 }
      ], 0)
      expect(result).toBe(false)
    })
  })

  describe('Abilities.MaxWordLength7', () => {
    it('should be true if the word is fewer letters long', () => {
      const result = getAbilityIsActive([
        { id: '4', char: 's', price: 1, points: 1, ability: Abilities.MaxWordLength7 },
        { id: '5', char: 't', price: 1, points: 1 },
        { id: '1', char: 'a', price: 1, points: 1 },
        { id: '3', char: 'n', price: 1, points: 1 },
        { id: '2', char: 'd', price: 1, points: 1 },
        { id: '4', char: 's', price: 1, points: 1 }
      ], 0)
      expect(result).toBe(true)
    })

    it('should be true if the word is seven letters long', () => {
      const result = getAbilityIsActive([
        { id: '4', char: 's', price: 1, points: 1, ability: Abilities.MaxWordLength7 },
        { id: '5', char: 't', price: 1, points: 1 },
        { id: '1', char: 'a', price: 1, points: 1 },
        { id: '3', char: 'n', price: 1, points: 1 },
        { id: '2', char: 'd', price: 1, points: 1 },
        { id: '6', char: 'e', price: 1, points: 1 },
        { id: '6', char: 'e', price: 1, points: 1 }
      ], 0)
      expect(result).toBe(true)
    })

    it('should be false if the word is greater letters long', () => {
      const result = getAbilityIsActive([
        { id: '4', char: 's', price: 1, points: 1, ability: Abilities.MaxWordLength7 },
        { id: '5', char: 't', price: 1, points: 1 },
        { id: '1', char: 'a', price: 1, points: 1 },
        { id: '3', char: 'n', price: 1, points: 1 },
        { id: '2', char: 'd', price: 1, points: 1 },
        { id: '6', char: 'e', price: 1, points: 1 },
        { id: '6', char: 'e', price: 1, points: 1 },
        { id: '4', char: 's', price: 1, points: 1 }
      ], 0)
      expect(result).toBe(false)
    })
  })

  describe('Abilities.MinWordLength4', () => {
    it('should be true if the word is greater letters long', () => {
      const result = getAbilityIsActive([
        { id: '4', char: 's', price: 1, points: 1, ability: Abilities.MinWordLength4 },
        { id: '5', char: 't', price: 1, points: 1 },
        { id: '1', char: 'a', price: 1, points: 1 },
        { id: '3', char: 'n', price: 1, points: 1 },
        { id: '2', char: 'd', price: 1, points: 1 }
      ], 0)
      expect(result).toBe(true)
    })

    it('should be true if the word is four letters long', () => {
      const result = getAbilityIsActive([
        { id: '4', char: 's', price: 1, points: 1, ability: Abilities.MinWordLength4 },
        { id: '1', char: 'a', price: 1, points: 1 },
        { id: '3', char: 'n', price: 1, points: 1 },
        { id: '2', char: 'd', price: 1, points: 1 }
      ], 0)
      expect(result).toBe(true)
    })

    it('should be false if the word is fewer letters long', () => {
      const result = getAbilityIsActive([
        { id: '4', char: 's', price: 1, points: 1, ability: Abilities.MinWordLength4 },
        { id: '1', char: 'a', price: 1, points: 1 },
        { id: '2', char: 'd', price: 1, points: 1 }
      ], 0)
      expect(result).toBe(false)
    })
  })

  describe('Abilities.MinWordLength5', () => {
    it('should be true if the word is greater letters long', () => {
      const result = getAbilityIsActive([
        { id: '4', char: 's', price: 1, points: 1, ability: Abilities.MinWordLength5 },
        { id: '5', char: 't', price: 1, points: 1 },
        { id: '1', char: 'a', price: 1, points: 1 },
        { id: '3', char: 'n', price: 1, points: 1 },
        { id: '2', char: 'd', price: 1, points: 1 },
        { id: '4', char: 's', price: 1, points: 1 }
      ], 0)
      expect(result).toBe(true)
    })

    it('should be true if the word is five letters long', () => {
      const result = getAbilityIsActive([
        { id: '4', char: 's', price: 1, points: 1, ability: Abilities.MinWordLength5 },
        { id: '5', char: 't', price: 1, points: 1 },
        { id: '1', char: 'a', price: 1, points: 1 },
        { id: '3', char: 'n', price: 1, points: 1 },
        { id: '2', char: 'd', price: 1, points: 1 }
      ], 0)
      expect(result).toBe(true)
    })

    it('should be false if the word is fewer letters long', () => {
      const result = getAbilityIsActive([
        { id: '4', char: 's', price: 1, points: 1, ability: Abilities.MinWordLength5 },
        { id: '1', char: 'a', price: 1, points: 1 },
        { id: '3', char: 'n', price: 1, points: 1 },
        { id: '2', char: 'd', price: 1, points: 1 }
      ], 0)
      expect(result).toBe(false)
    })
  })

  describe('Abilities.MinWordLength6', () => {
    it('should be true if the word is greater letters long', () => {
      const result = getAbilityIsActive([
        { id: '4', char: 's', price: 1, points: 1, ability: Abilities.MinWordLength6 },
        { id: '5', char: 't', price: 1, points: 1 },
        { id: '1', char: 'a', price: 1, points: 1 },
        { id: '3', char: 'n', price: 1, points: 1 },
        { id: '2', char: 'd', price: 1, points: 1 },
        { id: '6', char: 'e', price: 1, points: 1 },
        { id: '6', char: 'e', price: 1, points: 1 }
      ], 0)
      expect(result).toBe(true)
    })

    it('should be true if the word is six letters long', () => {
      const result = getAbilityIsActive([
        { id: '4', char: 's', price: 1, points: 1, ability: Abilities.MinWordLength6 },
        { id: '5', char: 't', price: 1, points: 1 },
        { id: '1', char: 'a', price: 1, points: 1 },
        { id: '3', char: 'n', price: 1, points: 1 },
        { id: '2', char: 'd', price: 1, points: 1 },
        { id: '4', char: 's', price: 1, points: 1 }
      ], 0)
      expect(result).toBe(true)
    })

    it('should be false if the word is fewer letters long', () => {
      const result = getAbilityIsActive([
        { id: '4', char: 's', price: 1, points: 1, ability: Abilities.MinWordLength6 },
        { id: '5', char: 't', price: 1, points: 1 },
        { id: '1', char: 'a', price: 1, points: 1 },
        { id: '3', char: 'n', price: 1, points: 1 },
        { id: '2', char: 'd', price: 1, points: 1 }
      ], 0)
      expect(result).toBe(false)
    })
  })

  describe('Abilities.MinWordLength7', () => {
    it('should be true if the word is greater letters long', () => {
      const result = getAbilityIsActive([
        { id: '4', char: 's', price: 1, points: 1, ability: Abilities.MinWordLength7 },
        { id: '5', char: 't', price: 1, points: 1 },
        { id: '1', char: 'a', price: 1, points: 1 },
        { id: '3', char: 'n', price: 1, points: 1 },
        { id: '2', char: 'd', price: 1, points: 1 },
        { id: '6', char: 'e', price: 1, points: 1 },
        { id: '6', char: 'e', price: 1, points: 1 },
        { id: '4', char: 's', price: 1, points: 1 }
      ], 0)
      expect(result).toBe(true)
    })

    it('should be true if the word is seven letters long', () => {
      const result = getAbilityIsActive([
        { id: '4', char: 's', price: 1, points: 1, ability: Abilities.MinWordLength7 },
        { id: '5', char: 't', price: 1, points: 1 },
        { id: '1', char: 'a', price: 1, points: 1 },
        { id: '3', char: 'n', price: 1, points: 1 },
        { id: '2', char: 'd', price: 1, points: 1 },
        { id: '6', char: 'e', price: 1, points: 1 },
        { id: '6', char: 'e', price: 1, points: 1 }
      ], 0)
      expect(result).toBe(true)
    })

    it('should be false if the word is fewer letters long', () => {
      const result = getAbilityIsActive([
        { id: '4', char: 's', price: 1, points: 1, ability: Abilities.MinWordLength7 },
        { id: '5', char: 't', price: 1, points: 1 },
        { id: '1', char: 'a', price: 1, points: 1 },
        { id: '3', char: 'n', price: 1, points: 1 },
        { id: '2', char: 'd', price: 1, points: 1 },
        { id: '4', char: 's', price: 1, points: 1 }
      ], 0)
      expect(result).toBe(false)
    })
  })

  // todo
})