import { ICampaignGame, IPlayer, ISubmitCampaignWord } from "../../../common/datamodels"
import { Abilities } from "../../../common/enums"
import { Database } from "../db/Database"
import { IDatabaseConnection } from "../db/IDatabaseConnection"
import { getValidateCampaignWordError } from "./validateCampaignWord"

describe("getValidateCampaignWordError", () => {
  let db: Database, testInput: ISubmitCampaignWord, game: ICampaignGame, player: IPlayer

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
        { id: "7", char: "v", price: 1, points: 4 }
      ]
    }

    player = {
      startDate: "2022-04-09",
      endDate: "2022-04-09",
      userId: "0",
      inventory: [],
      funding: 0,
      isMember: false,
      points: 0
    }

    const testDatabaseConnection: Pick<IDatabaseConnection, "getCampaignGame" | "getPlayer"> = {
      getCampaignGame: (dateString: string) => Promise.resolve(dateString === game.date ? game : undefined),
      getPlayer: (userId: string) => Promise.resolve(userId === player.userId ? player : undefined)
    }

    db = new Database(testDatabaseConnection as IDatabaseConnection)
  })


  it("doesn't return error if everything is okay", async () => {
    const result = await getValidateCampaignWordError(testInput, db)
    expect(result).toBe(undefined)
  })

  it("returns error if game cannot be found", async () => {
    testInput.date = "2022-04-08"
    const result = await getValidateCampaignWordError(testInput, db)
    expect(result).toBe("Unable to validate - could not find game")
  })

  it("doesn't return error if player cannot be found", async () => {
    testInput.userId = "-1"
    const result = await getValidateCampaignWordError(testInput, db)
    expect(result).toBe(undefined)
  })

  it("returns error if unknown letter ID", async () => {
    testInput.word[0].id = "wrong"
    const result = await getValidateCampaignWordError(testInput, db)
    expect(result).toBe("Unable to validate - letter not available or could not find letter")
  })

  it("returns error if letter character does not match", async () => {
    testInput.word[1].char = "a"
    const result = await getValidateCampaignWordError(testInput, db)
    expect(result).toBe("Unable to validate - letter character is incorrect")
  })

  it("doesn't return error if letter character does not match but letter is wild", async () => {
    testInput.word[2].id = "6"
    const result = await getValidateCampaignWordError(testInput, db)
    expect(result).toBe(undefined)
  })

  it("returns error if wild has is more than one character", async () => {
    testInput.word[2].id = "6"
    testInput.word[2].char = "gs"
    const result = await getValidateCampaignWordError(testInput, db)
    expect(result).toBe("Unable to validate - letter character is incorrect")
  })

  it("returns error if money used is greater than money available", async () => {
    game.money = 2
    const result = await getValidateCampaignWordError(testInput, db)
    expect(result).toBe("Unable to validate - insufficient money")
  })

  it("doesn't return error if funding used", async () => {
    game.money = 6
    player.funding = 7
    const result = await getValidateCampaignWordError(testInput, db)
    expect(result).toBe(undefined)
  })

  it("doesn't return error if inventory letter is used", async () => {
    testInput.word[1].id = "8"
    player.inventory = [{ id: "8", char: "i", price: 0, points: 3 }]
    const result = await getValidateCampaignWordError(testInput, db)
    expect(result).toBe(undefined)
  })

  it("returns error if inventory letter is used more than once", async () => {
    testInput.word[0].id = "8"
    testInput.word[2].id = "8"
    player.inventory = [{ id: "8", char: "g", price: 0, points: 3 }]
    const result = await getValidateCampaignWordError(testInput, db)
    expect(result).toBe("Unable to validate - inventory letter used more than once")
  })

  it("return error if word is not in wordlist", async () => {
    testInput.word.push({ id: "1", char: "g" })
    const result = await getValidateCampaignWordError(testInput, db)
    expect(result).toBe("Unable to validate - word is not in wordlist")
  })
})