import { Abilities } from "../../enums"
import { getIsNextToVowelActive } from "./getIsNextToVowelActive"

describe("getNextToVowelActive", () => {
  it("returns false if word only has one letter", () => {
    const result = getIsNextToVowelActive([
      { id: "1", char: "a", price: 1, points: 1, ability: Abilities.NextToVowel },
    ], 0)
    expect(result).toBe(false)
  })

  it("returns false if letter is first and not next to vowel", () => {
    const result = getIsNextToVowelActive([
      { id: "1", char: "t", price: 1, points: 1, ability: Abilities.NextToVowel },
      { id: "2", char: "r", price: 1, points: 1, ability: Abilities.Retain },
      { id: "3", char: "y", price: 1, points: 1 },
    ], 0)
    expect(result).toBe(false)
  })

  it("returns true if letter is first and is next to vowel", () => {
    const result = getIsNextToVowelActive([
      { id: "1", char: "b", price: 1, points: 1, ability: Abilities.NextToVowel },
      { id: "2", char: "u", price: 1, points: 1 },
      { id: "3", char: "y", price: 1, points: 1 },
    ], 0)
    expect(result).toBe(true)
  })

  it("returns false if letter is last and not next to vowel", () => {
    const result = getIsNextToVowelActive([
      { id: "1", char: "a", price: 1, points: 1 },
      { id: "2", char: "n", price: 1, points: 1, ability: Abilities.Wild },
      { id: "3", char: "d", price: 1, points: 1, ability: Abilities.NextToVowel },
    ], 2)
    expect(result).toBe(false)
  })

  it("returns true if letter is last and is next to vowel", () => {
    const result = getIsNextToVowelActive([
      { id: "1", char: "b", price: 1, points: 1 },
      { id: "2", char: "u", price: 1, points: 1, ability: Abilities.Wild },
      { id: "3", char: "y", price: 1, points: 1, ability: Abilities.NextToVowel },
    ], 2)
    expect(result).toBe(true)
  })

  it("returns false if letter is in the middle and not next to vowel", () => {
    const result = getIsNextToVowelActive([
      { id: "1", char: "b", price: 1, points: 1 },
      { id: "2", char: "u", price: 1, points: 1, ability: Abilities.NextToVowel },
      { id: "3", char: "y", price: 1, points: 1, ability: Abilities.Retain },
    ], 1)
    expect(result).toBe(false)
  })

  it("returns true if letter is in the middle and next to vowel on left", () => {
    const result = getIsNextToVowelActive([
      { id: "1", char: "a", price: 1, points: 1, ability: Abilities.Wild },
      { id: "2", char: "n", price: 1, points: 1, ability: Abilities.NextToVowel },
      { id: "3", char: "d", price: 1, points: 1 },
    ], 1)
    expect(result).toBe(true)
  })

  it("returns true if letter is in the middle and next to vowel on right", () => {
    const result = getIsNextToVowelActive([
      { id: "1", char: "t", price: 1, points: 1, ability: Abilities.Retain },
      { id: "2", char: "e", price: 1, points: 1, ability: Abilities.NextToVowel },
      { id: "3", char: "e", price: 1, points: 1 },
    ], 1)
    expect(result).toBe(true)
  })

  it("returns true if letter is in the middle and next to vowel on both sides", () => {
    const result = getIsNextToVowelActive([
      { id: "1", char: "e", price: 1, points: 1 },
      { id: "2", char: "v", price: 1, points: 1, ability: Abilities.NextToVowel },
      { id: "3", char: "e", price: 1, points: 1, ability: Abilities.Wild },
    ], 1)
    expect(result).toBe(true)
  })
})