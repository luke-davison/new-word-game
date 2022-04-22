

import { IDailyGame, IGame } from '../../../common/datamodels';
import { Abilities } from '../../../common/enums';
import { getDateString } from '../../../common/utils/getDateString';

const games: IDailyGame[] = [
  { 
    date: "2022-03-20",
    letters: [
      { char: "t", price: 4, points: 4, ability: Abilities.Vowels, abilityPoints: 1 },
      { char: "i", price: 5, points: 3, ability: Abilities.OtherInPosition1 },
      { char: "l", price: 3, points: 4, ability: Abilities.MinWordLength7, abilityPoints: 3 },
      { char: "t", price: 4, points: 4, ability: Abilities.NextToVowel, abilityPoints: 2 },
      { char: "i", price: 1, points: 2 },
      { char: "n", price: 5, points: 8 },
      { char: "g", price: 4, points: 4, ability: Abilities.NextToWild, abilityPoints: 4 }
    ],
    target: 25,
    secretTarget: 30,
    // maxTarget: 34,
    money: 18
  },
  { 
    date: "2022-03-21",
    letters: [
      { char: "l", price: 4, points: 4, ability: Abilities.Wilds, abilityPoints: 1 },
      { char: "i", price: 1, points: 2 },
      { char: "t", price: 3, points: 4, ability: Abilities.InPosition4, abilityPoints: 4 },
      { char: "m", price: 4, points: 4, ability: Abilities.Vowels, abilityPoints: 1 },
      { char: "u", price: 5, points: 8 },
      { char: "s", price: 4, points: 4, ability: Abilities.MinWordLength6, abilityPoints: 3 }
    ],
    target: 26,
    secretTarget: 29,
    // maxTarget: 33,
    money: 18
  },
  { 
    date: "2022-03-22",
    letters: [
      { char: "b", price: 4, points: 4, ability: Abilities.NextToWild, abilityPoints: 3 },
      { char: "o", price: 4, points: 4, ability: Abilities.MinWordLength6, abilityPoints: 3 },
      { char: "r", price: 4, points: 3, ability: Abilities.InPosition1, abilityPoints: 4 },
      { char: "e", price: 1, points: 1 },
      { char: "r", price: 4, points: 3, ability: Abilities.InPositionLast, abilityPoints: 4 },
      { char: "s", price: 3, points: 3, ability: Abilities.NotNextToVowel, abilityPoints: 3 }
    ],
    target: 24,
    secretTarget: 28,
    // maxTarget: 29, // checked
    money: 18
  },
  { 
    date: "2022-03-23",
    letters: [
      { char: "p", price: 4, points: 4, ability: Abilities.NextToVowel, abilityPoints: 4 },
      { char: "r", price: 5, points: 8 },
      { char: "o", price: 3, points: 4, ability: Abilities.InPosition1, abilityPoints: 4 },
      { char: "m", price: 3, points: 4, ability: Abilities.NextToWild, abilityPoints: 4 },
      { char: "o", price: 4, points: 4, ability: Abilities.Wilds, abilityPoints: 1 },
      { char: "t", price: 4, points: 4, ability: Abilities.Vowels, abilityPoints: 1 },
      { char: "e", price: 1, points: 2 }
    ],
    target: 29,
    secretTarget: 31,
    // maxTarget: 36,
    money: 18
  },
  { 
    date: "2022-03-24",
    letters: [
      { char: "s", price: 4, points: 3, ability: Abilities.Wilds, abilityPoints: 1 },
      { char: "l", price: 4, points: 4, ability: Abilities.NotNextToVowel, abilityPoints: 4 },
      { char: "i", price: 3, points: 3, ability: Abilities.NextToVowel, abilityPoints: 4 },
      { char: "t", price: 4, points: 3, ability: Abilities.NextToWild, abilityPoints: 3 },
      { char: "h", price: 4, points: 5, ability: Abilities.Vowels, abilityPoints: 1 },
      { char: "e", price: 1, points: 2 },
      { char: "r", price: 4, points: 3, ability: Abilities.InPosition4, abilityPoints: 4 }
    ],
    target: 27,
    secretTarget: 29,
    // maxTarget: 32, // checked
    money: 18
  },
  { 
    date: "2022-03-25",
    letters: [
      { char: "r", price: 4, points: 4, ability: Abilities.Vowels, abilityPoints: 1 },
      { char: "i", price: 4, points: 4, ability: Abilities.MinWordLength6, abilityPoints: 4 },
      { char: "p", price: 3, points: 4, ability: Abilities.InPositionLast, abilityPoints: 4 },
      { char: "p", price: 4, points: 3, ability: Abilities.NextToVowel, abilityPoints: 3 },
      { char: "l", price: 3, points: 3, ability: Abilities.InPosition3, abilityPoints: 5 },
      { char: "e", price: 1, points: 2 },
      { char: "d", price: 4, points: 4, ability: Abilities.NotNextToVowel, abilityPoints: 5 }
    ],
    target: 28,
    secretTarget: 31,
    // maxTarget: 35, // checked
    money: 18
  },
  { 
    date: "2022-03-26",
    letters: [
      { char: "k", price: 3, points: 4, ability: Abilities.MinWordLength7, abilityPoints: 4 },
      { char: "i", price: 4, points: 4, ability: Abilities.NotNextToVowel, abilityPoints: 2 },
      { char: "n", price: 3, points: 3, ability: Abilities.InPosition3, abilityPoints: 4 },
      { char: "g", price: 3, points: 4, ability: Abilities.InPosition1, abilityPoints: 4 },
      { char: "p", price: 4, points: 4, ability: Abilities.NextToVowel, abilityPoints: 3 },
      { char: "i", price: 1, points: 2 },
      { char: "n", price: 4, points: 4, ability: Abilities.Vowels, abilityPoints: 1 }
    ],
    target: 27,
    secretTarget: 30,
    // maxTarget: 32, // checked
    money: 18
  },
  { 
    date: "2022-03-27",
    letters: [
      { char: "m", price: 4, points: 4, ability: Abilities.NotNextToVowel, abilityPoints: 5 },
      { char: "u", price: 3, points: 3, ability: Abilities.NextToWild, abilityPoints: 4 },
      { char: "e", price: 1, points: 2 },
      { char: "s", price: 4, points: 4, ability: Abilities.InPosition1, abilityPoints: 4 },
      { char: "l", price: 4, points: 4, ability: Abilities.Wilds, abilityPoints: 1 },
      { char: "i", price: 4, points: 4, ability: Abilities.OtherInPosition4 }
    ],
    target: 29,
    secretTarget: 31,
    // maxTarget: 32, // checked
    money: 18
  },
  { 
    date: "2022-03-28",
    letters: [
      { char: "m", price: 3, points: 4, ability: Abilities.NextToVowel, abilityPoints: 3 },
      { char: "e", price: 5, points: 7 },
      { char: "l", price: 4, points: 3, ability: Abilities.OtherInPosition1 },
      { char: "a", price: 4, points: 4, ability: Abilities.NotNextToVowel, abilityPoints: 2 },
      { char: "n", price: 3, points: 3, ability: Abilities.InPosition3, abilityPoints: 4 },
      { char: "g", price: 4, points: 4, ability: Abilities.NotNextToVowel, abilityPoints: 4 },
      { char: "e", price: 1, points: 2 }
    ],
    target: 27,
    secretTarget: 32,
    // maxTarget: 34, // checked
    money: 18
  },
  { 
    date: "2022-03-29",
    letters: [
      { char: "c", price: 3, points: 4, ability: Abilities.NotNextToVowel, abilityPoints: 4 },
      { char: "a", price: 4, points: 3, ability: Abilities.WordLength7, abilityPoints: 5 },
      { char: "r", price: 4, points: 3, ability: Abilities.OtherInPosition4 },
      { char: "b", price: 4, points: 3, ability: Abilities.NextToWild, abilityPoints: 3 },
      { char: "i", price: 4, points: 3, ability: Abilities.Vowels },
      { char: "d", price: 4, points: 4, ability: Abilities.MaxWordLength6, abilityPoints: 3 },
      { char: "e", price: 1, points: 2 }
    ],
    target: 27,
    secretTarget: 31,
    // maxTarget: 32, // checked
    money: 18
  },
  { 
    date: "2022-03-30",
    letters: [
      { char: "b", price: 4, points: 4, ability: Abilities.MinWordLength6, abilityPoints: 3 },
      { char: "r", price: 3, points: 3, ability: Abilities.InPosition4, abilityPoints: 4 },
      { char: "a", price: 4, points: 3, ability: Abilities.InPosition1, abilityPoints: 4 },
      { char: "z", price: 3, points: 4, ability: Abilities.Vowels, abilityPoints: 1 },
      { char: "e", price: 3, points: 3, ability: Abilities.InPositionLast, abilityPoints: 3 },
      { char: "n", price: 1, points: 2 },
    ],
    target: 24,
    secretTarget: 30,
    // maxTarget: 32, // checked
    money: 20
  },
  { 
    date: "2022-03-31",
    letters: [
      { char: "a", price: 4, points: 4, ability: Abilities.NextToWild, abilityPoints: 3 },
      { char: "l", price: 4, points: 4, ability: Abilities.InPositionLast, abilityPoints: 3 },
      { char: "u", price: 4, points: 4, ability: Abilities.MaxWordLength6, abilityPoints: 4 },
      { char: "m", price: 4, points: 4, ability: Abilities.WordLength7, abilityPoints: 3 },
      { char: "n", price: 3, points: 3, ability: Abilities.Vowels, abilityPoints: 1 },
      { char: "u", price: 1, points: 2 },
      { char: "s", price: 4, points: 4, ability: Abilities.NotNextToVowel, abilityPoints: 4 },
    ],
    target: 28,
    secretTarget: 31,
    // maxTarget: 32, // checked
    money: 18
  },
  { 
    date: "2022-04-01",
    letters: [
      { char: "m", price: 4, points: 4, ability: Abilities.MinWordLength7, abilityPoints: 4 },
      { char: "e", price: 4, points: 3, ability: Abilities.NextToVowel, abilityPoints: 3 },
      { char: "d", price: 4, points: 3, ability: Abilities.Vowels, abilityPoints: 1 },
      { char: "l", price: 4, points: 3, ability: Abilities.NextToWild, abilityPoints: 3 },
      { char: "e", price: 1, points: 2 },
      { char: "y", price: 3, points: 4, ability: Abilities.WordLength5, abilityPoints: 4 },
      { char: "s", price: 4, points: 4, ability: Abilities.InPosition1, abilityPoints: 4 },
    ],
    target: 27,
    secretTarget: 30,
    // maxTarget: 30, // checked
    money: 18
  },
  { 
    date: "2022-04-02",
    letters: [
      { char: "g", price: 3, points: 4, ability: Abilities.InPosition2, abilityPoints: 4 },
      { char: "r", price: 4, points: 3, ability: Abilities.NextToWild, abilityPoints: 3 },
      { char: "a", price: 3, points: 3, ability: Abilities.NextToVowel, abilityPoints: 4 },
      { char: "h", price: 3, points: 4, ability: Abilities.InPositionLast, abilityPoints: 4 },
      { char: "a", price: 1, points: 2 },
      { char: "m", price: 4, points: 4, ability: Abilities.MinWordLength7, abilityPoints: 3 },
    ],
    target: 22,
    secretTarget: 24,
    // maxTarget: 25, // checked
    money: 15
  },
  { 
    date: "2022-04-03",
    letters: [
      { char: "c", price: 4, points: 3, ability: Abilities.NextToWild, abilityPoints: 3 },
      { char: "o", price: 4, points: 3, ability: Abilities.WordLength7, abilityPoints: 4 },
      { char: "r", price: 1, points: 2 },
      { char: "d", price: 3, points: 4, ability: Abilities.InPosition1, abilityPoints: 4 },
      { char: "o", price: 3, points: 4, ability: Abilities.InPosition3, abilityPoints: 4 },
      { char: "n", price: 4, points: 3, ability: Abilities.Wilds, abilityPoints: 1 },
    ],
    target: 28,
    secretTarget: 31,
    // maxTarget: 32, // checked
    money: 19
  }
]

export const getDailyGame = (gameDate?: Date): IDailyGame | undefined => {
  const date = gameDate || new Date();
  const todayString = getDateString(date)
  return games.find((game) => game.date === todayString)
}