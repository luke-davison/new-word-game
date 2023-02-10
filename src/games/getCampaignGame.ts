import { ICampaignGame, ILetter } from '../../client/src/shared/datamodels'
import { Abilities } from '../../client/src/shared/enums'
import { getWildLetter } from './getWildLetter'

export const originalDate = new Date(2023, 1, 6)

interface ICampaignGameNoIds extends Omit<ICampaignGame, 'letters' | 'memberLetters' | 'date'> {
  letters: Array<Omit<ILetter, 'id'>>
  memberLetters: Array<Omit<ILetter, 'id'>>,
}

const games: ICampaignGameNoIds[] = [
  {
    letters: [
      { char: 'm', price: 3, points: 4, ability: Abilities.Funding1 },
      { char: 'e', price: 1, points: 2 },
      { char: 'r', price: 3, points: 4, ability: Abilities.InPosition1, abilityPoints: 4 },
      { char: 'i', price: 4, points: 4, ability: Abilities.NextToVowel, abilityPoints: 3 },
      { char: 't', price: 4, points: 2, ability: Abilities.Retain }
    ],
    money: 15,
    memberLetters: []
  },
  {
    letters: [
      { char: 'e', price: 3, points: 3, ability: Abilities.RetainLeft },
      { char: 'n', price: 1, points: 2 },
      { char: 't', price: 3, points: 3, ability: Abilities.Club },
      { char: 'e', price: 4, points: 4, ability: Abilities.NotNextToVowel, abilityPoints: 3 },
      { char: 'r', price: 4, points: 3, ability: Abilities.MinWordLength6, abilityPoints: 3 }
    ],
    money: 15,
    memberLetters: []
  },
  {
    letters: [
      { char: 'b', price: 4, points: 3, ability: Abilities.Funding2 },
      { char: 'u', price: 1, points: 2 },
      { char: 'l', price: 3, points: 3, ability: Abilities.InPosition4, abilityPoints: 4 },
      { char: 'b', price: 3, points: 2, ability: Abilities.Retain },
      { char: 's', price: 3, points: 3, ability: Abilities.InPosition1, abilityPoints: 4 }
    ],
    money: 14,
    memberLetters: [
      { char: 'z', price: 1, points: 3 }
    ]
  },
  {
    letters: [
      { char: 's', price: 4, points: 2, ability: Abilities.RetainRight },
      { char: 'a', price: 1, points: 2 },
      { char: 'u', price: 5, points: 8 },
      { char: 'n', price: 4, points: 3, ability: Abilities.MinWordLength7, abilityPoints: 4 },
      { char: 'a', price: 4, points: 3, ability: Abilities.Funding2 }
    ],
    money: 14,
    memberLetters: [
      { char: 'q', price: 1, points: 3 }
    ]
  },
  {
    letters: [
      { char: 'v', price: 3, points: 4, ability: Abilities.WordLength6 },
      { char: 'e', price: 4, points: 2, ability: Abilities.Retain },
      { char: 'r', price: 1, points: 1, ability: Abilities.Club },
      { char: 'g', price: 3, points: 3, ability: Abilities.NotNextToVowel, abilityPoints: 4 },
      { char: 'e', price: 4, points: 3, ability: Abilities.Wilds, abilityPoints: 1 }
    ],
    money: 13,
    memberLetters: [
      { char: 'h', price: 1, points: 3 }
    ]
  },
  {
    letters: [
      { char: 'c', price: 3, points: 4, ability: Abilities.MaxWordLength5 },
      { char: 'h', price: 3, points: 4, ability: Abilities.RetainLeft },
      { char: 'i', price: 1, points: 2 },
      { char: 'm', price: 3, points: 4, ability: Abilities.NotNextToVowel, abilityPoints: 4 },
      { char: 'p', price: 4, points: 3, ability: Abilities.Wilds, abilityPoints: 1 }
    ],
    money: 12,
    memberLetters: [
      { char: 'x', price: 1, points: 5 }
    ]
  },
  {
    letters: [
      { char: 'g', price: 3, points: 4, ability: Abilities.InPosition3, abilityPoints: 4 },
      { char: 'r', price: 4, points: 4, ability: Abilities.Vowels, abilityPoints: 1 },
      { char: 'a', price: 1, points: 2 },
      { char: 's', price: 4, points: 3, ability: Abilities.WordLength6, abilityPoints: 4 },
      { char: 'p', price: 4, points: 3, ability: Abilities.OtherInPosition1 }
    ],
    money: 13,
    memberLetters: [
      { char: 'v', price: 1, points: 4 }
    ]
  },
  {
    letters: [
      { char: 'p', price: 3, points: 4, ability: Abilities.Funding1 },
      { char: 'r', price: 1, points: 2 },
      { char: 'o', price: 3, points: 4, ability: Abilities.InPosition1, abilityPoints: 4 },
      { char: 'p', price: 4, points: 4, ability: Abilities.NextToVowel, abilityPoints: 3 },
      { char: 's', price: 4, points: 2, ability: Abilities.Retain }
    ],
    money: 15,
    memberLetters: []
  },
  {
    letters: [
      { char: 'g', price: 3, points: 3, ability: Abilities.RetainLeft },
      { char: 'r', price: 1, points: 2 },
      { char: 'i', price: 3, points: 3, ability: Abilities.Club },
      { char: 'n', price: 4, points: 4, ability: Abilities.NotNextToVowel, abilityPoints: 3 },
      { char: 'd', price: 4, points: 3, ability: Abilities.MinWordLength6, abilityPoints: 3 }
    ],
    money: 15,
    memberLetters: []
  },
  {
    letters: [
      { char: 'w', price: 4, points: 3, ability: Abilities.Funding2 },
      { char: 'i', price: 1, points: 2 },
      { char: 'p', price: 3, points: 3, ability: Abilities.InPosition4, abilityPoints: 4 },
      { char: 'e', price: 3, points: 2, ability: Abilities.Retain },
      { char: 'd', price: 3, points: 3, ability: Abilities.InPosition1, abilityPoints: 4 }
    ],
    money: 14,
    memberLetters: [
      { char: 'z', price: 1, points: 3 }
    ]
  },
  {
    letters: [
      { char: 'd', price: 4, points: 2, ability: Abilities.RetainRight },
      { char: 'u', price: 1, points: 2 },
      { char: 'd', price: 5, points: 8 },
      { char: 'e', price: 4, points: 3, ability: Abilities.MinWordLength7, abilityPoints: 4 },
      { char: 's', price: 4, points: 3, ability: Abilities.Funding2 }
    ],
    money: 14,
    memberLetters: [
      { char: 'q', price: 1, points: 3 }
    ]
  },
  {
    letters: [
      { char: 's', price: 3, points: 4, ability: Abilities.WordLength6 },
      { char: 't', price: 4, points: 2, ability: Abilities.Retain },
      { char: 'u', price: 1, points: 1, ability: Abilities.Club },
      { char: 'b', price: 3, points: 3, ability: Abilities.NotNextToVowel, abilityPoints: 4 },
      { char: 's', price: 4, points: 3, ability: Abilities.Wilds, abilityPoints: 1 }
    ],
    money: 13,
    memberLetters: [
      { char: 'h', price: 1, points: 3 }
    ]
  },
  {
    letters: [
      { char: 't', price: 3, points: 4, ability: Abilities.MaxWordLength5 },
      { char: 'i', price: 3, points: 4, ability: Abilities.RetainLeft },
      { char: 'l', price: 1, points: 2 },
      { char: 'e', price: 3, points: 4, ability: Abilities.NotNextToVowel, abilityPoints: 4 },
      { char: 's', price: 4, points: 3, ability: Abilities.Wilds, abilityPoints: 1 }
    ],
    money: 12,
    memberLetters: [
      { char: 'x', price: 1, points: 5 }
    ]
  },
  {
    letters: [
      { char: 'h', price: 3, points: 4, ability: Abilities.InPosition3, abilityPoints: 4 },
      { char: 'a', price: 4, points: 4, ability: Abilities.Vowels, abilityPoints: 1 },
      { char: 'z', price: 1, points: 2 },
      { char: 'e', price: 4, points: 3, ability: Abilities.WordLength6, abilityPoints: 4 },
      { char: 'l', price: 4, points: 3, ability: Abilities.OtherInPosition1 }
    ],
    money: 13,
    memberLetters: [
      { char: 'v', price: 1, points: 4 }
    ]
  }
]

export const getCampaignGame = (dateString: string): ICampaignGame | undefined => {
  const date = new Date(dateString);
  const offset = Math.abs(Math.floor((date.getTime() - originalDate.getTime()) / (1000 * 60 * 60 * 24))) % games.length
  
  const game = games[offset]
  if (!game) {
    return undefined
  }

  const letters: ILetter[] = [
    ...game.letters,
    getWildLetter()
  ].map((letter, index) => {
    return {
      ...letter,
      id: 'd' + dateString + (index + 1)
    }
  })

  const memberLetters: ILetter[] = game.memberLetters.map((letter, index) => {
    return {
      ...letter,
      id: 'd' + dateString + (index + 1) + 'm'
    }
  })

  return { ...game, letters, memberLetters, date: dateString }
}