import { Abilities, Game } from '../models';

export const getCampaignGame = (id: string, day: number): Game | undefined => {
  switch (id) {
    case "1": 
      switch (day) {
        case 0:
          return {
            date: "2022-04-03",
            letters: [
              { letter: "m", price: 3, points: 4, ability: Abilities.Funding1 },
              { letter: "e", price: 1, points: 2 },
              { letter: "r", price: 3, points: 4, ability: Abilities.InPosition1, abilityPoints: 4 },
              { letter: "i", price: 4, points: 4, ability: Abilities.NextToVowel, abilityPoints: 3 },
              { letter: "t", price: 3, points: 2, ability: Abilities.Retain },
            ],
            money: 15
          }
        case 1:
          return {
            date: "2022-04-04",
            letters: [
              { letter: "e", price: 3, points: 3, ability: Abilities.RetainLeft },
              { letter: "n", price: 1, points: 2 },
              { letter: "t", price: 3, points: 3, ability: Abilities.Club },
              { letter: "e", price: 4, points: 4, ability: Abilities.NotNextToVowel, abilityPoints: 3 },
              { letter: "r", price: 4, points: 3, ability: Abilities.MinWordLength6, abilityPoints: 3 },
            ],
            money: 15
          }
        case 2:
          return {
            date: "2022-04-05",
            letters: [
              { letter: "b", price: 4, points: 3, ability: Abilities.Funding2 },
              { letter: "u", price: 1, points: 2 },
              { letter: "l", price: 3, points: 3, ability: Abilities.InPosition4, abilityPoints: 4 },
              { letter: "b", price: 3, points: 4, ability: Abilities.Retain },
              { letter: "s", price: 3, points: 3, ability: Abilities.InPosition1, abilityPoints: 4 },
            ],
            money: 15
          }
        case 3:
          return {
            date: "2022-04-06",
            letters: [],
            money: 15
          }
        case 4:
          return {
            date: "2022-04-07",
            letters: [],
            money: 15
          }
        case 5:
          return {
            date: "2022-04-08",
            letters: [],
            money: 15
          }
        case 6:
          return {
            date: "2022-04-09",
            letters: [],
            money: 15
          }
      }
    break;
  }

  return undefined
}