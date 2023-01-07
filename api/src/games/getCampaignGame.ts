import { ICampaignGame, ILetter } from '../../../src/shared/datamodels';
import { Abilities } from '../../../src/shared/enums';
import { getWildLetter } from './getWildLetter';

interface ICampaignGameNoIds extends Omit<ICampaignGame, "letters" | "memberLetters"> {
  letters: Array<Omit<ILetter, "id">>
  memberLetters: Array<Omit<ILetter, "id">>,
}

const games: ICampaignGameNoIds[] = [
  {
    date: "2023-01-08",
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
    date: "2022-07-03",
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
    date: "2022-07-09",
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
    date: "2022-07-10",
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
    date: "2022-08-13",
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
    date: "2022-08-14",
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
    date: "2022-08-28",
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
  },
  {
    date: "2022-05-23",
    letters: [
      { char: "p", price: 3, points: 4, ability: Abilities.Funding1 },
      { char: "r", price: 1, points: 2 },
      { char: "o", price: 3, points: 4, ability: Abilities.InPosition1, abilityPoints: 4 },
      { char: "p", price: 4, points: 4, ability: Abilities.NextToVowel, abilityPoints: 3 },
      { char: "s", price: 4, points: 2, ability: Abilities.Retain },
    ],
    money: 15,
    memberLetters: []
  },
  {
    date: "2022-05-24",
    letters: [
      { char: "g", price: 3, points: 3, ability: Abilities.RetainLeft },
      { char: "r", price: 1, points: 2 },
      { char: "i", price: 3, points: 3, ability: Abilities.Club },
      { char: "n", price: 4, points: 4, ability: Abilities.NotNextToVowel, abilityPoints: 3 },
      { char: "d", price: 4, points: 3, ability: Abilities.MinWordLength6, abilityPoints: 3 },
    ],
    money: 15,
    memberLetters: []
  },
  {
    date: "2022-05-25",
    letters: [
      { char: "w", price: 4, points: 3, ability: Abilities.Funding2 },
      { char: "i", price: 1, points: 2 },
      { char: "p", price: 3, points: 3, ability: Abilities.InPosition4, abilityPoints: 4 },
      { char: "e", price: 3, points: 2, ability: Abilities.Retain },
      { char: "d", price: 3, points: 3, ability: Abilities.InPosition1, abilityPoints: 4 },
    ],
    money: 14,
    memberLetters: [
      { char: "z", price: 1, points: 3 }
    ]
  },
  {
    date: "2022-05-26",
    letters: [
      { char: "d", price: 4, points: 2, ability: Abilities.RetainRight },
      { char: "u", price: 1, points: 2 },
      { char: "d", price: 5, points: 8 },
      { char: "e", price: 4, points: 3, ability: Abilities.MinWordLength7, abilityPoints: 4 },
      { char: "s", price: 4, points: 3, ability: Abilities.Funding2 },
    ],
    money: 14,
    memberLetters: [
      { char: "q", price: 1, points: 3 }
    ]
  },
  {
    date: "2022-05-27",
    letters: [
      { char: "s", price: 3, points: 4, ability: Abilities.WordLength6 },
      { char: "t", price: 4, points: 2, ability: Abilities.Retain },
      { char: "u", price: 1, points: 1, ability: Abilities.Club },
      { char: "b", price: 3, points: 3, ability: Abilities.NotNextToVowel, abilityPoints: 4 },
      { char: "s", price: 4, points: 3, ability: Abilities.Wilds, abilityPoints: 1 },
    ],
    money: 13,
    memberLetters: [
      { char: "h", price: 1, points: 3 }
    ]
  },
  {
    date: "2022-05-28",
    letters: [
      { char: "t", price: 3, points: 4, ability: Abilities.MaxWordLength5 },
      { char: "i", price: 3, points: 4, ability: Abilities.RetainLeft },
      { char: "l", price: 1, points: 2 },
      { char: "e", price: 3, points: 4, ability: Abilities.NotNextToVowel, abilityPoints: 4 },
      { char: "s", price: 4, points: 3, ability: Abilities.Wilds, abilityPoints: 1 },
    ],
    money: 12,
    memberLetters: [
      { char: "x", price: 1, points: 5 }
    ]
  },
  {
    date: "2022-05-29",
    letters: [
      { char: "h", price: 3, points: 4, ability: Abilities.InPosition3, abilityPoints: 4 },
      { char: "a", price: 4, points: 4, ability: Abilities.Vowels, abilityPoints: 1 },
      { char: "z", price: 1, points: 2 },
      { char: "e", price: 4, points: 3, ability: Abilities.WordLength6, abilityPoints: 4 },
      { char: "l", price: 4, points: 3, ability: Abilities.OtherInPosition1 },
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

  const letters: ILetter[] = [
    ...game.letters,
    getWildLetter()
  ].map((letter, index) => {
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

  return { ...game, letters, memberLetters }
}