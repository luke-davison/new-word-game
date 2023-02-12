"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCampaignGame = exports.originalDate = void 0;
const enums_1 = require("../../client/src/shared/enums");
const getWildLetter_1 = require("./getWildLetter");
exports.originalDate = new Date(2023, 1, 6);
const games = [
    {
        letters: [
            { char: 'm', price: 3, points: 4, ability: enums_1.Abilities.Funding1 },
            { char: 'e', price: 1, points: 2 },
            { char: 'r', price: 3, points: 4, ability: enums_1.Abilities.InPosition1, abilityPoints: 4 },
            { char: 'i', price: 4, points: 4, ability: enums_1.Abilities.NextToVowel, abilityPoints: 3 },
            { char: 't', price: 4, points: 2, ability: enums_1.Abilities.Retain }
        ],
        money: 15,
        memberLetters: []
    },
    {
        letters: [
            { char: 'e', price: 3, points: 3, ability: enums_1.Abilities.RetainLeft },
            { char: 'n', price: 1, points: 2 },
            { char: 't', price: 3, points: 3, ability: enums_1.Abilities.Club },
            { char: 'e', price: 4, points: 4, ability: enums_1.Abilities.NotNextToVowel, abilityPoints: 3 },
            { char: 'r', price: 4, points: 3, ability: enums_1.Abilities.MinWordLength6, abilityPoints: 3 }
        ],
        money: 15,
        memberLetters: []
    },
    {
        letters: [
            { char: 'b', price: 4, points: 3, ability: enums_1.Abilities.Funding2 },
            { char: 'u', price: 1, points: 2 },
            { char: 'l', price: 3, points: 3, ability: enums_1.Abilities.InPosition4, abilityPoints: 4 },
            { char: 'b', price: 3, points: 2, ability: enums_1.Abilities.Retain },
            { char: 's', price: 3, points: 3, ability: enums_1.Abilities.InPosition1, abilityPoints: 4 }
        ],
        money: 14,
        memberLetters: [
            { char: 'z', price: 1, points: 3 }
        ]
    },
    {
        letters: [
            { char: 's', price: 4, points: 2, ability: enums_1.Abilities.RetainRight },
            { char: 'a', price: 1, points: 2 },
            { char: 'u', price: 5, points: 8 },
            { char: 'n', price: 4, points: 3, ability: enums_1.Abilities.MinWordLength7, abilityPoints: 4 },
            { char: 'a', price: 4, points: 3, ability: enums_1.Abilities.Funding2 }
        ],
        money: 14,
        memberLetters: [
            { char: 'q', price: 1, points: 3 }
        ]
    },
    {
        letters: [
            { char: 'v', price: 3, points: 4, ability: enums_1.Abilities.WordLength6 },
            { char: 'e', price: 4, points: 2, ability: enums_1.Abilities.Retain },
            { char: 'r', price: 1, points: 1, ability: enums_1.Abilities.Club },
            { char: 'g', price: 3, points: 3, ability: enums_1.Abilities.NotNextToVowel, abilityPoints: 4 },
            { char: 'e', price: 4, points: 3, ability: enums_1.Abilities.Wilds, abilityPoints: 1 }
        ],
        money: 13,
        memberLetters: [
            { char: 'h', price: 1, points: 3 }
        ]
    },
    {
        letters: [
            { char: 'c', price: 3, points: 4, ability: enums_1.Abilities.MaxWordLength5 },
            { char: 'h', price: 3, points: 4, ability: enums_1.Abilities.RetainLeft },
            { char: 'i', price: 1, points: 2 },
            { char: 'm', price: 3, points: 4, ability: enums_1.Abilities.NotNextToVowel, abilityPoints: 4 },
            { char: 'p', price: 4, points: 3, ability: enums_1.Abilities.Wilds, abilityPoints: 1 }
        ],
        money: 12,
        memberLetters: [
            { char: 'x', price: 1, points: 5 }
        ]
    },
    {
        letters: [
            { char: 'g', price: 3, points: 4, ability: enums_1.Abilities.InPosition3, abilityPoints: 4 },
            { char: 'r', price: 4, points: 4, ability: enums_1.Abilities.Vowels, abilityPoints: 1 },
            { char: 'a', price: 1, points: 2 },
            { char: 's', price: 4, points: 3, ability: enums_1.Abilities.WordLength6, abilityPoints: 4 },
            { char: 'p', price: 4, points: 3, ability: enums_1.Abilities.OtherInPosition1 }
        ],
        money: 13,
        memberLetters: [
            { char: 'v', price: 1, points: 4 }
        ]
    },
    {
        letters: [
            { char: 'p', price: 3, points: 4, ability: enums_1.Abilities.Funding1 },
            { char: 'r', price: 1, points: 2 },
            { char: 'o', price: 3, points: 4, ability: enums_1.Abilities.InPosition1, abilityPoints: 4 },
            { char: 'p', price: 4, points: 4, ability: enums_1.Abilities.NextToVowel, abilityPoints: 3 },
            { char: 's', price: 4, points: 2, ability: enums_1.Abilities.Retain }
        ],
        money: 15,
        memberLetters: []
    },
    {
        letters: [
            { char: 'g', price: 3, points: 3, ability: enums_1.Abilities.RetainLeft },
            { char: 'r', price: 1, points: 2 },
            { char: 'i', price: 3, points: 3, ability: enums_1.Abilities.Club },
            { char: 'n', price: 4, points: 4, ability: enums_1.Abilities.NotNextToVowel, abilityPoints: 3 },
            { char: 'd', price: 4, points: 3, ability: enums_1.Abilities.MinWordLength6, abilityPoints: 3 }
        ],
        money: 15,
        memberLetters: []
    },
    {
        letters: [
            { char: 'w', price: 4, points: 3, ability: enums_1.Abilities.Funding2 },
            { char: 'i', price: 1, points: 2 },
            { char: 'p', price: 3, points: 3, ability: enums_1.Abilities.InPosition4, abilityPoints: 4 },
            { char: 'e', price: 3, points: 2, ability: enums_1.Abilities.Retain },
            { char: 'd', price: 3, points: 3, ability: enums_1.Abilities.InPosition1, abilityPoints: 4 }
        ],
        money: 14,
        memberLetters: [
            { char: 'z', price: 1, points: 3 }
        ]
    },
    {
        letters: [
            { char: 'd', price: 4, points: 2, ability: enums_1.Abilities.RetainRight },
            { char: 'u', price: 1, points: 2 },
            { char: 'd', price: 5, points: 8 },
            { char: 'e', price: 4, points: 3, ability: enums_1.Abilities.MinWordLength7, abilityPoints: 4 },
            { char: 's', price: 4, points: 3, ability: enums_1.Abilities.Funding2 }
        ],
        money: 14,
        memberLetters: [
            { char: 'q', price: 1, points: 3 }
        ]
    },
    {
        letters: [
            { char: 's', price: 3, points: 4, ability: enums_1.Abilities.WordLength6 },
            { char: 't', price: 4, points: 2, ability: enums_1.Abilities.Retain },
            { char: 'u', price: 1, points: 1, ability: enums_1.Abilities.Club },
            { char: 'b', price: 3, points: 3, ability: enums_1.Abilities.NotNextToVowel, abilityPoints: 4 },
            { char: 's', price: 4, points: 3, ability: enums_1.Abilities.Wilds, abilityPoints: 1 }
        ],
        money: 13,
        memberLetters: [
            { char: 'h', price: 1, points: 3 }
        ]
    },
    {
        letters: [
            { char: 't', price: 3, points: 4, ability: enums_1.Abilities.MaxWordLength5 },
            { char: 'i', price: 3, points: 4, ability: enums_1.Abilities.RetainLeft },
            { char: 'l', price: 1, points: 2 },
            { char: 'e', price: 3, points: 4, ability: enums_1.Abilities.NotNextToVowel, abilityPoints: 4 },
            { char: 's', price: 4, points: 3, ability: enums_1.Abilities.Wilds, abilityPoints: 1 }
        ],
        money: 12,
        memberLetters: [
            { char: 'x', price: 1, points: 5 }
        ]
    },
    {
        letters: [
            { char: 'h', price: 3, points: 4, ability: enums_1.Abilities.InPosition3, abilityPoints: 4 },
            { char: 'a', price: 4, points: 4, ability: enums_1.Abilities.Vowels, abilityPoints: 1 },
            { char: 'z', price: 1, points: 2 },
            { char: 'e', price: 4, points: 3, ability: enums_1.Abilities.WordLength6, abilityPoints: 4 },
            { char: 'l', price: 4, points: 3, ability: enums_1.Abilities.OtherInPosition1 }
        ],
        money: 13,
        memberLetters: [
            { char: 'v', price: 1, points: 4 }
        ]
    }
];
const getCampaignGame = (dateString) => {
    const date = new Date(dateString);
    const offset = Math.abs(Math.floor((date.getTime() - exports.originalDate.getTime()) / (1000 * 60 * 60 * 24))) % games.length;
    const game = games[offset];
    if (!game) {
        return undefined;
    }
    const letters = [
        ...game.letters,
        (0, getWildLetter_1.getWildLetter)()
    ].map((letter, index) => {
        return Object.assign(Object.assign({}, letter), { id: 'd' + dateString + (index + 1) });
    });
    const memberLetters = game.memberLetters.map((letter, index) => {
        return Object.assign(Object.assign({}, letter), { id: 'd' + dateString + (index + 1) + 'm' });
    });
    return Object.assign(Object.assign({}, game), { letters, memberLetters, date: dateString });
};
exports.getCampaignGame = getCampaignGame;
