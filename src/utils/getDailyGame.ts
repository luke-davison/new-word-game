import { Abilities, Game } from '../models';

const games: Game[] = [
  { 
    date: "2022-03-20",
    letters: [
      { letter: "t", price: 4, points: 4, ability: Abilities.Vowels, abilityPoints: 1 },
      { letter: "i", price: 5, points: 3, ability: Abilities.OtherInPosition1 },
      { letter: "l", price: 3, points: 4, ability: Abilities.MinWordLength7, abilityPoints: 3 },
      { letter: "t", price: 4, points: 4, ability: Abilities.NextToVowel, abilityPoints: 2 },
      { letter: "i", price: 1, points: 2 },
      { letter: "n", price: 5, points: 8 },
      { letter: "g", price: 4, points: 4, ability: Abilities.NextToWild, abilityPoints: 4 }
    ],
    target: 25,
    secretTarget: 30,
    maxTarget: 34,
    money: 18
  },
  { 
    date: "2022-03-21",
    letters: [
      { letter: "l", price: 4, points: 4, ability: Abilities.Wilds, abilityPoints: 1 },
      { letter: "i", price: 1, points: 2 },
      { letter: "t", price: 3, points: 4, ability: Abilities.InPosition4, abilityPoints: 4 },
      { letter: "m", price: 4, points: 4, ability: Abilities.Vowels, abilityPoints: 1 },
      { letter: "u", price: 5, points: 8 },
      { letter: "s", price: 4, points: 4, ability: Abilities.MinWordLength6, abilityPoints: 3 }
    ],
    target: 26,
    secretTarget: 29,
    maxTarget: 33,
    money: 18
  },
  { 
    date: "2022-03-22",
    letters: [
      { letter: "b", price: 4, points: 4, ability: Abilities.NextToWild, abilityPoints: 3 },
      { letter: "o", price: 4, points: 4, ability: Abilities.MinWordLength6, abilityPoints: 3 },
      { letter: "r", price: 4, points: 3, ability: Abilities.InPosition1, abilityPoints: 4 },
      { letter: "e", price: 1, points: 1 },
      { letter: "r", price: 4, points: 3, ability: Abilities.InPositionLast, abilityPoints: 4 },
      { letter: "s", price: 3, points: 3, ability: Abilities.NotNextToVowel, abilityPoints: 3 }
    ],
    target: 26,
    secretTarget: 28,
    maxTarget: 30,
    money: 18
  },
  { 
    date: "2022-03-23",
    letters: [
      { letter: "p", price: 4, points: 4, ability: Abilities.NextToVowel, abilityPoints: 4 },
      { letter: "r", price: 5, points: 8 },
      { letter: "o", price: 3, points: 4, ability: Abilities.InPosition1, abilityPoints: 4 },
      { letter: "m", price: 3, points: 4, ability: Abilities.NextToWild, abilityPoints: 4 },
      { letter: "o", price: 4, points: 4, ability: Abilities.Wilds, abilityPoints: 1 },
      { letter: "t", price: 4, points: 4, ability: Abilities.Vowels, abilityPoints: 1 },
      { letter: "e", price: 1, points: 2 }
    ],
    target: 29,
    secretTarget: 31,
    maxTarget: 36,
    money: 18
  },
  { 
    date: "2022-03-24",
    letters: [
      { letter: "s", price: 4, points: 3, ability: Abilities.Wilds, abilityPoints: 1 },
      { letter: "l", price: 4, points: 4, ability: Abilities.NotNextToVowel, abilityPoints: 4 },
      { letter: "i", price: 3, points: 3, ability: Abilities.NextToVowel, abilityPoints: 4 },
      { letter: "t", price: 4, points: 3, ability: Abilities.NextToWild, abilityPoints: 3 },
      { letter: "h", price: 4, points: 5, ability: Abilities.Vowels, abilityPoints: 1 },
      { letter: "e", price: 1, points: 2 },
      { letter: "r", price: 4, points: 3, ability: Abilities.InPosition4, abilityPoints: 4 }
    ],
    target: 25,
    secretTarget: 28,
    maxTarget: 30,
    money: 18
  },
  { 
    date: "2022-03-25",
    letters: [
      { letter: "r", price: 4, points: 4, ability: Abilities.Vowels, abilityPoints: 1 },
      { letter: "i", price: 4, points: 4, ability: Abilities.MinWordLength6, abilityPoints: 4 },
      { letter: "p", price: 3, points: 4, ability: Abilities.InPositionLast, abilityPoints: 4 },
      { letter: "p", price: 4, points: 3, ability: Abilities.NextToVowel, abilityPoints: 3 },
      { letter: "l", price: 3, points: 3, ability: Abilities.InPosition3, abilityPoints: 5 },
      { letter: "e", price: 1, points: 2 },
      { letter: "d", price: 4, points: 4, ability: Abilities.NotNextToVowel, abilityPoints: 5 }
    ],
    target: 25,
    secretTarget: 28,
    maxTarget: 30,
    money: 18
  },
  { 
    date: "2022-03-26",
    letters: [
      { letter: "k", price: 3, points: 4, ability: Abilities.MinWordLength7, abilityPoints: 4 },
      { letter: "i", price: 4, points: 4, ability: Abilities.NotNextToVowel, abilityPoints: 2 },
      { letter: "n", price: 3, points: 3, ability: Abilities.InPosition3, abilityPoints: 4 },
      { letter: "g", price: 3, points: 4, ability: Abilities.InPosition1, abilityPoints: 4 },
      { letter: "p", price: 4, points: 4, ability: Abilities.NextToVowel, abilityPoints: 3 },
      { letter: "i", price: 1, points: 2 },
      { letter: "n", price: 4, points: 4, ability: Abilities.Vowels, abilityPoints: 1 }
    ],
    target: 27,
    secretTarget: 30,
    maxTarget: 32, // checked
    money: 18
  },
  { 
    date: "2022-03-27",
    letters: [
      { letter: "m", price: 4, points: 4, ability: Abilities.NotNextToVowel, abilityPoints: 5 },
      { letter: "u", price: 3, points: 3, ability: Abilities.NextToWild, abilityPoints: 4 },
      { letter: "e", price: 1, points: 2 },
      { letter: "s", price: 4, points: 4, ability: Abilities.InPosition1, abilityPoints: 4 },
      { letter: "l", price: 4, points: 4, ability: Abilities.Wilds, abilityPoints: 1 },
      { letter: "i", price: 4, points: 4, ability: Abilities.OtherInPosition4 }
    ],
    target: 29,
    secretTarget: 31,
    maxTarget: 32, // checked
    money: 18
  }
]

export const getDailyGame = (gameDate?: Date): Game | undefined => {
  const date = gameDate || new Date();
  const todayString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
  return games.find((game) => game.date === todayString)
}