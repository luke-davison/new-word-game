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
    ]
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
    ]
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
    ]
  }
]

export const getDailyGame = (): Game | undefined => {
  const today = new Date();
  const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`
  return games.find((game) => game.date === todayString)
}