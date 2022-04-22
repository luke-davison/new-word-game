import { ILetter } from '../../../common/datamodels';
import { Abilities } from '../../../common/enums';
import { getIsCharacterVowel, wordlist } from '../../../common/utils';

export const generateGame = (): ILetter[] => {
  const letters = getRandomWord().split("");
  const uniqueLetters = sortByFrequency(Array.from(new Set(letters)))
  const output: ILetter[] = []
  
  const mostCommonLetter = uniqueLetters.splice(0, 1)[0]
  let mostCommonLetterOutput: ILetter | undefined = {
    char: mostCommonLetter,
    price: 1,
    points: 2
  }
  
  const abilities = ["multiply", "vowel", "word-length", "start", "last", "vowels", "wilds", "next-to-wild", "other-position", "large", "notvowels", "set-length"]
  const abilitiesShuffled: string[] = []
  for (let i = 0; i < letters.length - 1; i++) {
    abilitiesShuffled.push(abilities.splice(Math.floor(Math.random() * abilities.length), 1)[0])
  }

  letters.reverse().forEach((char) => {
    if (char === mostCommonLetterOutput?.char) {
      output.unshift({...mostCommonLetterOutput})
      mostCommonLetterOutput = undefined
    // } else if (letter === leastCommonLetterOutput?.letter) {
    //   leastCommonLetterOutput.color = 2
    //   output.unshift({...leastCommonLetterOutput, color: colorCount--})
    //   leastCommonLetterOutput = undefined
    } else {
      const frequencyIndex = letterFrequencies.findIndex((a) => a.letter === char)
      const ability = abilitiesShuffled.pop()
      if (ability === "set-points") {
        const frequencyFactor = Math.floor(frequencyIndex / 14)
        output.unshift({
          char,
          price: 2,
          points: 3 + frequencyFactor
        })
      } else if (ability === "start") {
        // TODO - cannot be letter at start of word
        const frequencyFactor = Math.floor(frequencyIndex / 14)
        output.unshift({
          char,
          price: 3,
          points: 4 + frequencyFactor,
          abilityPoints: 4,
          ability: Abilities.InPosition1
        })
      } else if (ability === "word-length") {
        const minLength = Math.floor(Math.random() * 2) + 6
        let ability: Abilities | undefined;
        switch (minLength) {
          case 6: ability = Abilities.MinWordLength6; break;
          case 7: ability = Abilities.MinWordLength7; break;
        }
        const frequencyFactor = Math.floor(frequencyIndex / 14) + Math.floor((minLength - 4) / 2) 
        output.unshift({
          char,
          price: 4,
          points: 4 + frequencyFactor,
          ability,
          abilityPoints: 4
        })
      } else if (ability === "vowel") {
        // TODO - cannot use for "hjklmnqrvxz"
        const frequencyFactor = Math.floor(frequencyIndex / 14)
        output.unshift({
          char,
          price: 4,
          points: 3 + frequencyFactor,
          ability: Abilities.NextToVowel,
          abilityPoints: getIsCharacterVowel(char) ? 4 : 3
        })
      } else if (ability === "multiply") {
        // TODO - more expensive if large letter exists
        const possiblePositions: Abilities[] = [Abilities.OtherInPosition1, Abilities.OtherInPosition2, Abilities.OtherInPosition3, Abilities.OtherInPosition4]
        const randomIndex = Math.floor(Math.random() * possiblePositions.length)
        const frequencyFactor = Math.floor(frequencyIndex / 17)
        output.unshift({
          char,
          price: 5 - frequencyFactor,
          points: 4,
          ability: possiblePositions[randomIndex],
        })
      } else if (ability === "last") {
        // TODO - cannot be "dijqrsuvwxy"
        const frequencyFactor = Math.floor(frequencyIndex / 14)
        output.unshift({
          char,
          price: 3,
          points: 4 + frequencyFactor,
          ability: Abilities.InPositionLast,
          abilityPoints: 4
        })
      } else if (ability === "vowels") {
        output.unshift({
          char,
          price: 4,
          points: getIsCharacterVowel(char) ? 3 : 4,
          ability: Abilities.Vowels,
          abilityPoints: 1
        })
      } else if (ability === "wilds") {
        // TODO - cannot be used if too much money
        output.unshift({
          char,
          price: 4,
          points: 3,
          ability: Abilities.Wilds,
          abilityPoints: 1
        })
      } else if (ability === "next-to-wild") {
        const frequencyFactor = Math.floor(frequencyIndex / 14)
        output.unshift({
          char,
          price: 4,
          points: 3 + frequencyFactor,
          ability: Abilities.NextToWild,
          abilityPoints: 3
        })
      } else if (ability === "other-position") {
        // TODO - cannot use if this or same letter is in that position
        const positions: Abilities[] = [Abilities.InPosition2, Abilities.InPosition3, Abilities.InPosition4]
        const randomIndex = Math.floor(Math.random() * positions.length)
        const frequencyFactor = Math.floor(frequencyIndex / 14)
        output.unshift({
          char,
          price: 3,
          points: 4 + frequencyFactor,
          ability: positions[randomIndex],
          abilityPoints: 4
        })
      } else if (ability === "large") {
        output.unshift({
          char,
          price: 5,
          points: 8
        })
      } else if (ability === "notvowels") {
        // TODO - cannot use for "aehijklmnoqruvxz"
        const frequencyFactor = Math.floor(frequencyIndex / 14)
        output.unshift({
          char,
          price: 4 - frequencyFactor,
          points: 4,
          ability: Abilities.NotNextToVowel,
          abilityPoints: 4
        })
      } else if (ability === "set-length") {
        const frequencyFactor1 = frequencyIndex > 7 ? 1 : 0
        const frequencyFactor2 = Math.floor(frequencyIndex / 16)
        const lengths: Abilities[] = [Abilities.WordLength5, Abilities.WordLength6, Abilities.WordLength7]
        const randomIndex = Math.floor(Math.random() * lengths.length)
        output.unshift({
          char,
          price: 4,
          points: 3 + frequencyFactor1,
          ability: lengths[randomIndex],
          abilityPoints: 4 + frequencyFactor2
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
