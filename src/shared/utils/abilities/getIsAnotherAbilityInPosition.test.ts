import { Abilities } from "../../enums"
import { getIsAnotherAbilityInPosition } from "./getIsAnotherAbilityInPosition"

describe("getIsAnotherAbilityInPosition", () => {
  it("returns false if other letter is the same letter", () => {
    const result = getIsAnotherAbilityInPosition([
      { id: "1", char: "a", price: 1, points: 1, ability: Abilities.CopyAbilityInPosition1 },
    ], 0)
    expect(result).toBe(false)
  })

  it("returns false if other letter has no ability", () => {
    const result = getIsAnotherAbilityInPosition([
      { id: "1", char: "a", price: 1, points: 1 },
      { id: "2", char: "t", price: 1, points: 1, ability: Abilities.CopyAbilityInPosition1 },
    ], 0)
    expect(result).toBe(false)
  })

  it("returns false if other letter has a copy ability", () => {
    const result = getIsAnotherAbilityInPosition([
      { id: "1", char: "a", price: 1, points: 1, ability: Abilities.CopyAbilityInPosition2 },
      { id: "2", char: "t", price: 1, points: 1, ability: Abilities.CopyAbilityInPosition1 },
    ], 0)
    expect(result).toBe(false)
  })

  it("returns false if other letter has a club ability", () => {
    const result = getIsAnotherAbilityInPosition([
      { id: "1", char: "a", price: 1, points: 1, ability: Abilities.CopyAbilityInPosition2 },
      { id: "2", char: "t", price: 1, points: 1, ability: Abilities.Club },
    ], 1)
    expect(result).toBe(false)
  })

  it("returns true if other letter has a wild ability", () => {
    const result = getIsAnotherAbilityInPosition([
      { id: "1", char: "a", price: 1, points: 1, ability: Abilities.CopyAbilityInPosition2 },
      { id: "2", char: "t", price: 1, points: 1, ability: Abilities.Wild },
    ], 1)
    expect(result).toBe(false)
  })

  it("returns true if other letter has a valid ability (position 1)", () => {
    const result = getIsAnotherAbilityInPosition([
      { id: "2", char: "t", price: 1, points: 1, ability: Abilities.NextToWild },
      { id: "1", char: "a", price: 1, points: 1, ability: Abilities.CopyAbilityInPosition2 },
    ], 0)
    expect(result).toBe(true)
  })

  it("returns true if other letter has a valid ability (position 2)", () => {
    const result = getIsAnotherAbilityInPosition([
      { id: "1", char: "a", price: 1, points: 1, ability: Abilities.CopyAbilityInPosition2 },
      { id: "2", char: "t", price: 1, points: 1, ability: Abilities.NextToWild },
    ], 1)
    expect(result).toBe(true)
  })

  it("returns true if other letter has a valid ability (position 3)", () => {
    const result = getIsAnotherAbilityInPosition([
      { id: "1", char: "a", price: 1, points: 1, ability: Abilities.CopyAbilityInPosition3 },
      { id: "2", char: "n", price: 1, points: 1, ability: Abilities.NextToWild },
      { id: "3", char: "t", price: 1, points: 1, ability: Abilities.Wilds },
    ], 2)
    expect(result).toBe(true)
  })

  it("returns true if other letter has a valid ability (position 4)", () => {
    const result = getIsAnotherAbilityInPosition([
      { id: "1", char: "a", price: 1, points: 1, ability: Abilities.CopyAbilityInPosition4 },
      { id: "2", char: "n", price: 1, points: 1, ability: Abilities.NextToWild },
      { id: "3", char: "t", price: 1, points: 1, ability: Abilities.Wilds },
      { id: "4", char: "s", price: 1, points: 1, ability: Abilities.InPosition1 },
    ], 3)
    expect(result).toBe(true)
  })

  it("returns true if other letter has a valid ability (position 5)", () => {
    const result = getIsAnotherAbilityInPosition([
      { id: "4", char: "s", price: 1, points: 1, ability: Abilities.NextToWild },
      { id: "5", char: "c", price: 1, points: 1, ability: Abilities.Wilds },
      { id: "1", char: "a", price: 1, points: 1, ability: Abilities.CopyAbilityInPosition5 },
      { id: "2", char: "n", price: 1, points: 1, ability: Abilities.Club },
      { id: "3", char: "t", price: 1, points: 1, ability: Abilities.OtherInPosition1 },
    ], 4)
    expect(result).toBe(true)
  })
})