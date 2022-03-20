import { Abilities, Game } from '../models';

const games: Game[] = [
  { 
    date: "2022-03-20",
    letters: [
      { letter: "t", price: 4, points: 4, ability: Abilities.Vowels, abilityPoints: 1 },
      { letter: "i", price: 5, points: 3, ability: Abilities.OtherInPosition1 },
      { letter: "l", price: 3, points: 4, ability: Abilities.MinWordLength7, abilityPoints: 3 },
      { letter: "t", price: 4, points: 4, ability: Abilities.NextToVowel, abilityPoints: 2 },
      { letter: "i", price: 1, points: 2, abilityPoints: 1 },
      { letter: "n", price: 5, points: 8, abilityPoints: 1 },
      { letter: "g", price: 4, points: 4, ability: Abilities.NextToWild, abilityPoints: 4 }
    ]
  }
]

export const getDailyGame = (): Game | undefined => {
  const today = new Date();
  const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`
  return games.find((game) => game.date === todayString)
}