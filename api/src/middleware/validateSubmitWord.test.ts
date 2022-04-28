import { ICampaignGame, IPlayer, ISubmitWord } from "../../../common/datamodels"
import { Abilities } from "../../../common/enums"
import { validateSubmitWord } from "./validateSubmitWord"

describe("validateSubmitWord", () => {
  let testInput: ISubmitWord, game: ICampaignGame, player: IPlayer

  beforeEach(() => {
    testInput = {
      date: "2022-04-09",
      userId: '0',
      word: [{ id: '1', char: 'g' }, { id: '3', char: 'i'}, { id: '1', char: 'g' }]
    }

    game = {
      date: "2022-04-09",
      letters: [
        { id: "1", char: "g", price: 3, points: 4, ability: Abilities.InPosition3, abilityPoints: 4 },
        { id: "2", char: "r", price: 4, points: 4, ability: Abilities.Vowels, abilityPoints: 1 },
        { id: "3", char: "i", price: 1, points: 2 },
        { id: "4", char: "p", price: 4, points: 3, ability: Abilities.WordLength6, abilityPoints: 4 },
        { id: "5", char: "s", price: 4, points: 3, ability: Abilities.OtherInPosition1 },
        { id: "6", char: "", price: 1, points: 0, ability: Abilities.Wild }
      ],
      money: 13,
      memberLetters: [
        { id: "7", char: "n", price: 1, points: 4 }
      ]
    }

    player = {
      startDate: "2022-04-09",
      endDate: "2022-04-09",
      userId: "0",
      inventory: [],
      funding: 0,
      isMember: false,
      points: 0,
      lastSubmit: ""
    }
  })


  it("doesn't return error if everything is okay", () => {
    const result = validateSubmitWord(testInput, game, player)
    expect(result).toBe(undefined)
  })

  it("doesn't return error if player cannot be found", () => {
    const result = validateSubmitWord(testInput, game, undefined)
    expect(result).toBe(undefined)
  })

  it("returns error if unknown letter ID", () => {
    testInput.word[0].id = "wrong"
    const result = validateSubmitWord(testInput, game, player)
    expect(result).toBe("Unable to validate - letter not available or could not find letter")
  })

  it("returns error if letter character does not match", () => {
    testInput.word[1].char = "a"
    const result = validateSubmitWord(testInput, game, player)
    expect(result).toBe("Unable to validate - letter character is incorrect")
  })

  it("doesn't return error if letter character does not match but letter is wild", () => {
    testInput.word[2].id = "6"
    const result = validateSubmitWord(testInput, game, player)
    expect(result).toBe(undefined)
  })

  it("returns error if wild has is more than one character", () => {
    testInput.word[2].id = "6"
    testInput.word[2].char = "gs"
    const result = validateSubmitWord(testInput, game, player)
    expect(result).toBe("Unable to validate - letter character is incorrect")
  })

  it("returns error if money used is greater than money available", () => {
    game.money = 2
    const result = validateSubmitWord(testInput, game, player)
    expect(result).toBe("Unable to validate - insufficient money")
  })

  it("doesn't return error if funding used", () => {
    game.money = 6
    player.funding = 7
    const result = validateSubmitWord(testInput, game, player)
    expect(result).toBe(undefined)
  })

  it("doesn't return error if inventory letter is used", () => {
    testInput.word[1].id = "8"
    player.inventory = [{ id: "8", char: "i", price: 0, points: 3 }]
    const result = validateSubmitWord(testInput, game, player)
    expect(result).toBe(undefined)
  })

  it("returns error if inventory letter is used more than once", () => {
    testInput.word[0].id = "8"
    testInput.word[2].id = "8"
    player.inventory = [{ id: "8", char: "g", price: 0, points: 3 }]
    const result = validateSubmitWord(testInput, game, player)
    expect(result).toBe("Unable to validate - inventory letter used more than once")
  })

  it("returns error if member letter is used but player is not a member", () => {
    testInput.word[2].id = "7"
    player.isMember = false
    const result = validateSubmitWord(testInput, game, player)
    expect(result).toBe("Unable to validate - letter not available or could not find letter")
  })

  it("doesn't return an error if member letter is used and player is a member", () => {
    testInput.word[2].id = "7"
    testInput.word[2].char = "n"
    player.isMember = true
    const result = validateSubmitWord(testInput, game, player)
    expect(result).toBe(undefined)
  })

  it("return error if word is not in wordlist", () => {
    testInput.word.push({ id: "1", char: "g" })
    const result = validateSubmitWord(testInput, game, player)
    expect(result).toBe("Unable to validate - word is not in wordlist")
  })
})