import { ICampaignGame, ILetter } from '../../../common/datamodels';
import { Abilities } from '../../../common/enums';
import { getDateString } from '../../../common/utils';

interface ICampaignGameNoIds extends Omit<ICampaignGame, "letters" | "memberLetters"> {
  letters: Array<Omit<ILetter, "id">>
  memberLetters: Array<Omit<ILetter, "id">>,
}

const games: ICampaignGameNoIds[] = [
  {
    date: "2022-04-03",
    letters: [
      { char: "m", price: 3, points: 4, ability: Abilities.Funding1 },
      { char: "e", price: 1, points: 2 },
      { char: "r", price: 3, points: 4, ability: Abilities.InPosition1, abilityPoints: 4 },
      { char: "i", price: 4, points: 4, ability: Abilities.NextToVowel, abilityPoints: 3 },
      { char: "t", price: 4, points: 2, ability: Abilities.Retain },
    ],
    money: 15,
    memberLetters: []
  },
  {
    date: "2022-04-04",
    letters: [
      { char: "e", price: 3, points: 3, ability: Abilities.RetainLeft },
      { char: "n", price: 1, points: 2 },
      { char: "t", price: 3, points: 3, ability: Abilities.Club },
      { char: "e", price: 4, points: 4, ability: Abilities.NotNextToVowel, abilityPoints: 3 },
      { char: "r", price: 4, points: 3, ability: Abilities.MinWordLength6, abilityPoints: 3 },
    ],
    money: 15,
    memberLetters: []
  },
  {
    date: "2022-04-05",
    letters: [
      { char: "b", price: 4, points: 3, ability: Abilities.Funding2 },
      { char: "u", price: 1, points: 2 },
      { char: "l", price: 3, points: 3, ability: Abilities.InPosition4, abilityPoints: 4 },
      { char: "b", price: 3, points: 2, ability: Abilities.Retain },
      { char: "s", price: 3, points: 3, ability: Abilities.InPosition1, abilityPoints: 4 },
    ],
    money: 14,
    memberLetters: [
      { char: "z", price: 1, points: 3 }
    ]
  },
  {
    date: "2022-04-06",
    letters: [
      { char: "s", price: 4, points: 2, ability: Abilities.RetainRight },
      { char: "a", price: 1, points: 2 },
      { char: "u", price: 5, points: 8 },
      { char: "n", price: 4, points: 3, ability: Abilities.MinWordLength7, abilityPoints: 4 },
      { char: "a", price: 4, points: 3, ability: Abilities.Funding2 },
    ],
    money: 14,
    memberLetters: [
      { char: "q", price: 1, points: 3 }
    ]
  },
  {
    date: "2022-04-07",
    letters: [
      { char: "v", price: 3, points: 4, ability: Abilities.WordLength6 },
      { char: "e", price: 4, points: 2, ability: Abilities.Retain },
      { char: "r", price: 1, points: 1, ability: Abilities.Club },
      { char: "g", price: 3, points: 3, ability: Abilities.NotNextToVowel, abilityPoints: 4 },
      { char: "e", price: 4, points: 3, ability: Abilities.Wilds, abilityPoints: 1 },
    ],
    money: 13,
    memberLetters: [
      { char: "h", price: 1, points: 3 }
    ]
  },
  {
    date: "2022-04-08",
    letters: [
      { char: "c", price: 3, points: 4, ability: Abilities.MaxWordLength5 },
      { char: "h", price: 3, points: 4, ability: Abilities.RetainLeft },
      { char: "i", price: 1, points: 2 },
      { char: "m", price: 3, points: 4, ability: Abilities.NotNextToVowel, abilityPoints: 4 },
      { char: "p", price: 4, points: 3, ability: Abilities.Wilds, abilityPoints: 1 },
    ],
    money: 12,
    memberLetters: [
      { char: "x", price: 1, points: 5 }
    ]
  },
  {
    date: "2022-04-09",
    letters: [
      { char: "g", price: 3, points: 4, ability: Abilities.InPosition3, abilityPoints: 4 },
      { char: "r", price: 4, points: 4, ability: Abilities.Vowels, abilityPoints: 1 },
      { char: "a", price: 1, points: 2 },
      { char: "s", price: 4, points: 3, ability: Abilities.WordLength6, abilityPoints: 4 },
      { char: "p", price: 4, points: 3, ability: Abilities.OtherInPosition1 },
    ],
    money: 13,
    memberLetters: [
      { char: "v", price: 1, points: 4 }
    ]
  }
]

export const getCampaignGame = (dateString: string): ICampaignGame | undefined => {
  const game = games.find((game) => game.date === dateString)

  if (!game) {
    return undefined
  }

  const letters: ILetter[] = game.letters.map((letter, index) => {
    return {
      ...letter,
      id: 'd' + game.date + (index + 1)
    }
  })
  const memberLetters: ILetter[] = game.memberLetters.map((letter, index) => {
    return {
      ...letter,
      id: 'd' + game.date + (index + 1) + "m"
    }
  })

  return {...game, letters, memberLetters }
}