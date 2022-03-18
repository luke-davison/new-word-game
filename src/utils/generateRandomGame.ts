import { ShopLetter } from '../models';
import {
    getDoubleOtherLetterAbility, getInLastPosition, getInPositionAbility, getMinWordLengthAbility,
    getNextToVowelAbility, getPointsPerVowelAbility
} from './getAbilities';
import { wordlist } from './getWordlist';

export const generateGame = () => {
  const letters = getRandomWord().split("");
  const uniqueLetters = sortByFrequency(Array.from(new Set(letters)))
  const output: ShopLetter[] = []
  
  const mostCommonLetter = uniqueLetters.splice(0, 1)[0]
  let mostCommonLetterOutput: ShopLetter | undefined = {
    id: String(1),
    letter: mostCommonLetter,
    color: 0,
    price: 1,
    points: 1
  }

  const leastCommonLetter = uniqueLetters.splice(uniqueLetters.length - 1, 1)[0]
  let leastCommonLetterOutput: ShopLetter | undefined = {
    id: String(2),
    letter: leastCommonLetter,
    color: 1,
    price: 5,
    points: 4
  }

  const abilities = ["multiply", "vowel", "word-length", "start", "last", "vowels"]
  const abilitiesShuffled: string[] = []
  for (let i = 0; i < letters.length - 2; i++) {
    abilitiesShuffled.push(abilities.splice(Math.floor(Math.random() * abilities.length), 1)[0])
  }

  letters.reverse().forEach((letter) => {
    if (letter === mostCommonLetterOutput?.letter) {
      mostCommonLetterOutput.color = 1
      output.unshift(mostCommonLetterOutput)
      mostCommonLetterOutput = undefined
    } else if (letter === leastCommonLetterOutput?.letter) {
      leastCommonLetterOutput.color = 2
      output.unshift(leastCommonLetterOutput)
      leastCommonLetterOutput = undefined
    } else {
      const frequencyIndex = letterFrequencies.findIndex((a) => a.letter === letter)
      const ability = abilitiesShuffled.pop()
      if (ability === "set-points") {
        const frequencyFactor = Math.floor(frequencyIndex / 14)
        output.unshift({
          id: String(output.length + 1),
          letter,
          color: output.length + 1,
          price: 2,
          points: 2 + frequencyFactor
        })
      } else if (ability === "start") {
        const frequencyFactor = Math.floor(frequencyIndex / 14)
        output.unshift({
          id: String(output.length + 1),
          letter,
          color: output.length + 1,
          price: 3,
          points: 2 + frequencyFactor,
          ability: getInPositionAbility(2 - frequencyFactor, 0)
        })
      } else if (ability === "word-length") {
        const minLength = Math.floor(Math.random() * 4) + 4
        const frequencyFactor = Math.floor(frequencyIndex / 14) + Math.floor((minLength - 4) / 2) 
        output.unshift({
          id: String(output.length + 1),
          letter,
          color: output.length + 1,
          price: 4,
          points: 2 + frequencyFactor,
          ability: getMinWordLengthAbility(2, minLength)
        })
      } else if (ability === "vowel") {
        const frequencyFactor = Math.floor(frequencyIndex / 14)
        output.unshift({
          id: String(output.length + 1),
          letter,
          color: output.length + 1,
          price: 4 - frequencyFactor,
          points: 2,
          ability: getNextToVowelAbility(2)
        })
      } else if (ability === "multiply") {
        const possiblePositions = [0, 1, 2, 3].filter((position) => letters[position] !== leastCommonLetter)
        const position = possiblePositions[Math.floor(Math.random() * possiblePositions.length)]
        const frequencyFactor = Math.floor(frequencyIndex / 17)
        output.unshift({
          id: String(output.length + 1),
          letter,
          color: output.length + 1,
          price: 5 - frequencyFactor,
          points: 2,
          ability: getDoubleOtherLetterAbility(position)
        })
      } else if (ability === "last") {
        const frequencyFactor = Math.floor(frequencyIndex / 14)
        output.unshift({
          id: String(output.length + 1),
          letter,
          color: output.length + 1,
          price: 3,
          points: 2 + frequencyFactor,
          ability: getInLastPosition(2 - frequencyFactor)
        })
      } else if (ability === "vowels") {
        output.unshift({
          id: String(output.length + 1),
          letter,
          color: output.length + 1,
          price: 4,
          points: 2,
          ability: getPointsPerVowelAbility(1)
        })
      }
    }
  })

  return output
}

export const getRandomWord = (): string => {
  const r = Math.random()
  const wordlistLength = wordlist.length;
  const index = Math.floor(r * wordlistLength);
  const word = wordlist[index];
  if (word.length >= 6 && word.length <= 7) {
    return word
  }
  
  return getRandomWord()
}

export const sortByFrequency = (letters: string[]) => {
  return Array.from(letters).sort((a, b) => {
    const aIndex = letterFrequencies.findIndex((letter) => letter.letter === a)
    const bIndex = letterFrequencies.findIndex((letter) => letter.letter === b)
    return aIndex - bIndex
  })
}

const alphabet = "abcdefghijklmnopqrstuvwxyz-"

export const countLetters = () => {
  const map = new Map()
  alphabet.split("").forEach((letter) => {
    map.set(letter, 0)
  })

  wordlist.forEach((word) => {
    const letter = word.split("")[0]
    map.set(letter, map.get(letter) + 1)
  })

  console.log(JSON.stringify(Array.from(map).map(([abc, freq]) => ({ letter: abc, count: freq})).sort((a, b) => b.count - a.count)))
}

const letterFrequencies = [
  {letter: "e", count: 56003},
  {letter: "i", count: 2631},
  {letter: "s", count: 41429},
  {letter: "a", count: 36650},
  {letter: "r", count: 35208},
  {letter: "n", count: 34477},
  {letter: "t", count: 33933},
  {letter: "o", count: 29053},
  {letter: "l", count: 26399},
  {letter: "c", count: 19909},
  {letter: "d", count: 19367},
  {letter: "u", count: 16500},
  {letter: "g", count: 14299},
  {letter: "p", count: 14119},
  {letter: "m", count: 12944},
  {letter: "h", count: 10402},
  {letter: "b", count: 9046},
  {letter: "y", count: 8349},
  {letter: "f", count: 6876},
  {letter: "v", count: 5130},
  {letter: "w", count: 4127},
  {letter: "k", count: 3943},
  {letter: "x", count: 1391},
  {letter: "q", count: 870},
  {letter: "j", count: 807},
  {letter: "z", count: 715}
]

const firstLetterFrequencies = [
  {"letter":"s","count":6670},
  {"letter":"c","count":5493},
  {"letter":"p","count":4563},
  {"letter":"d","count":3776},
  {"letter":"r","count":3634},
  {"letter":"a","count":3479},
  {"letter":"b","count":3210},
  {"letter":"m","count":2944},
  {"letter":"t","count":2881},
  {"letter":"i","count":2673},
  {"letter":"e","count":2588},
  {"letter":"f","count":2557},
  {"letter":"h","count":2026},
  {"letter":"u","count":1921},
  {"letter":"l","count":1837},
  {"letter":"g","count":1836},
  {"letter":"w","count":1542},
  {"letter":"o","count":1388},
  {"letter":"n","count":919},
  {"letter":"v","count":811},
  {"letter":"j","count":473},
  {"letter":"k","count":354},
  {"letter":"q","count":290},
  {"letter":"y","count":144},
  {"letter":"z","count":86},
  {"letter":"x","count":14}
]

// most common letter will be price 1, points 1
// least common letter is high value, high-ish price
