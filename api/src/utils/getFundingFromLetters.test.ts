import { ILetter } from "../../../common/datamodels"
import { Abilities } from "../../../common/enums"
import { getFundingFromLetters } from "./getFundingFromLetters"

describe("getFundingFromLetters", () => {
  it("returns 0 if no letters", () => {
    const testData: ILetter[] = []
    const result = getFundingFromLetters(testData)
    expect(result).toBe(0)
  })

  it("returns 0 if no letters with abilities", () => {
    const testData: ILetter[] = [{ id: "1", char: "a", points: 1, price: 1 }]
    const result = getFundingFromLetters(testData)
    expect(result).toBe(0)
  })

  it("returns 0 if letters with other abilities", () => {
    const testData: ILetter[] = [
      { id: "1", char: "a", points: 1, price: 1, ability: Abilities.InPosition1 },
      { id: "1", char: "b", points: 1, price: 1, ability: Abilities.InPosition2 }
    ]
    const result = getFundingFromLetters(testData)
    expect(result).toBe(0)
  })

  it("returns correct total if mix of funding abilities", () => {
    const testData: ILetter[] = [
      { id: "1", char: "a", points: 1, price: 1, ability: Abilities.Funding1 },
      { id: "1", char: "b", points: 1, price: 1, ability: Abilities.Funding2 },
      { id: "1", char: "c", points: 1, price: 1, ability: Abilities.InPosition2 },
      { id: "1", char: "d", points: 1, price: 1, ability: Abilities.Funding2 },
      { id: "1", char: "e", points: 1, price: 1, ability: Abilities.Funding2 }
    ]
    const result = getFundingFromLetters(testData)
    expect(result).toBe(7)
  })
})