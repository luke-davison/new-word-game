"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDailyGame = exports.originalDate = void 0;
const enums_1 = require("../../client/src/shared/enums");
const getWildLetter_1 = require("./getWildLetter");
exports.originalDate = new Date(2023, 1, 6);
const games = [
    {
        letters: [
            { char: 't', price: 4, points: 4, ability: enums_1.Abilities.Vowels, abilityPoints: 1 },
            { char: 'i', price: 5, points: 3, ability: enums_1.Abilities.OtherInPosition1 },
            { char: 'l', price: 3, points: 4, ability: enums_1.Abilities.MinWordLength7, abilityPoints: 3 },
            { char: 't', price: 4, points: 4, ability: enums_1.Abilities.NextToVowel, abilityPoints: 2 },
            { char: 'i', price: 1, points: 2 },
            { char: 'n', price: 5, points: 8 },
            { char: 'g', price: 4, points: 4, ability: enums_1.Abilities.NextToWild, abilityPoints: 4 }
        ],
        target: 25,
        secretTarget: 30,
        maxTarget: 34,
        money: 18
    },
    {
        letters: [
            { char: 'l', price: 4, points: 4, ability: enums_1.Abilities.Wilds, abilityPoints: 1 },
            { char: 'i', price: 1, points: 2 },
            { char: 't', price: 3, points: 4, ability: enums_1.Abilities.InPosition4, abilityPoints: 4 },
            { char: 'm', price: 4, points: 4, ability: enums_1.Abilities.Vowels, abilityPoints: 1 },
            { char: 'u', price: 5, points: 8 },
            { char: 's', price: 4, points: 4, ability: enums_1.Abilities.MinWordLength6, abilityPoints: 3 }
        ],
        target: 26,
        secretTarget: 29,
        maxTarget: 33,
        money: 18
    },
    {
        letters: [
            { char: 'b', price: 4, points: 4, ability: enums_1.Abilities.NextToWild, abilityPoints: 3 },
            { char: 'o', price: 4, points: 4, ability: enums_1.Abilities.MinWordLength6, abilityPoints: 3 },
            { char: 'r', price: 4, points: 3, ability: enums_1.Abilities.InPosition1, abilityPoints: 4 },
            { char: 'e', price: 1, points: 1 },
            { char: 'r', price: 4, points: 3, ability: enums_1.Abilities.InPositionLast, abilityPoints: 4 },
            { char: 's', price: 3, points: 3, ability: enums_1.Abilities.NotNextToVowel, abilityPoints: 3 }
        ],
        target: 24,
        secretTarget: 28,
        maxTarget: 29,
        money: 18
    },
    {
        letters: [
            { char: 'p', price: 4, points: 4, ability: enums_1.Abilities.NextToVowel, abilityPoints: 4 },
            { char: 'r', price: 5, points: 8 },
            { char: 'o', price: 3, points: 4, ability: enums_1.Abilities.InPosition1, abilityPoints: 4 },
            { char: 'm', price: 3, points: 4, ability: enums_1.Abilities.NextToWild, abilityPoints: 4 },
            { char: 'o', price: 4, points: 4, ability: enums_1.Abilities.Wilds, abilityPoints: 1 },
            { char: 't', price: 4, points: 4, ability: enums_1.Abilities.Vowels, abilityPoints: 1 },
            { char: 'e', price: 1, points: 2 }
        ],
        target: 29,
        secretTarget: 31,
        maxTarget: 36,
        money: 18
    },
    {
        letters: [
            { char: 's', price: 4, points: 3, ability: enums_1.Abilities.Wilds, abilityPoints: 1 },
            { char: 'l', price: 4, points: 4, ability: enums_1.Abilities.NotNextToVowel, abilityPoints: 4 },
            { char: 'i', price: 3, points: 3, ability: enums_1.Abilities.NextToVowel, abilityPoints: 4 },
            { char: 't', price: 4, points: 3, ability: enums_1.Abilities.NextToWild, abilityPoints: 3 },
            { char: 'h', price: 4, points: 5, ability: enums_1.Abilities.Vowels, abilityPoints: 1 },
            { char: 'e', price: 1, points: 2 },
            { char: 'r', price: 4, points: 3, ability: enums_1.Abilities.InPosition4, abilityPoints: 4 }
        ],
        target: 27,
        secretTarget: 29,
        maxTarget: 32,
        money: 18
    },
    {
        letters: [
            { char: 'r', price: 4, points: 4, ability: enums_1.Abilities.Vowels, abilityPoints: 1 },
            { char: 'i', price: 4, points: 4, ability: enums_1.Abilities.MinWordLength6, abilityPoints: 4 },
            { char: 'p', price: 3, points: 4, ability: enums_1.Abilities.InPositionLast, abilityPoints: 4 },
            { char: 'p', price: 4, points: 3, ability: enums_1.Abilities.NextToVowel, abilityPoints: 3 },
            { char: 'l', price: 3, points: 3, ability: enums_1.Abilities.InPosition3, abilityPoints: 5 },
            { char: 'e', price: 1, points: 2 },
            { char: 'd', price: 4, points: 4, ability: enums_1.Abilities.NotNextToVowel, abilityPoints: 5 }
        ],
        target: 28,
        secretTarget: 31,
        maxTarget: 35,
        money: 18
    },
    {
        letters: [
            { char: 'k', price: 3, points: 4, ability: enums_1.Abilities.MinWordLength7, abilityPoints: 4 },
            { char: 'i', price: 4, points: 4, ability: enums_1.Abilities.NotNextToVowel, abilityPoints: 2 },
            { char: 'n', price: 3, points: 3, ability: enums_1.Abilities.InPosition3, abilityPoints: 4 },
            { char: 'g', price: 3, points: 4, ability: enums_1.Abilities.InPosition1, abilityPoints: 4 },
            { char: 'p', price: 4, points: 4, ability: enums_1.Abilities.NextToVowel, abilityPoints: 3 },
            { char: 'i', price: 1, points: 2 },
            { char: 'n', price: 4, points: 4, ability: enums_1.Abilities.Vowels, abilityPoints: 1 }
        ],
        target: 27,
        secretTarget: 30,
        maxTarget: 32,
        money: 18
    },
    {
        letters: [
            { char: 'm', price: 4, points: 4, ability: enums_1.Abilities.NotNextToVowel, abilityPoints: 5 },
            { char: 'u', price: 3, points: 3, ability: enums_1.Abilities.NextToWild, abilityPoints: 4 },
            { char: 'e', price: 1, points: 2 },
            { char: 's', price: 4, points: 4, ability: enums_1.Abilities.InPosition1, abilityPoints: 4 },
            { char: 'l', price: 4, points: 4, ability: enums_1.Abilities.Wilds, abilityPoints: 1 },
            { char: 'i', price: 4, points: 4, ability: enums_1.Abilities.OtherInPosition4 }
        ],
        target: 29,
        secretTarget: 31,
        maxTarget: 32,
        money: 18
    },
    {
        letters: [
            { char: 'm', price: 3, points: 4, ability: enums_1.Abilities.NextToVowel, abilityPoints: 3 },
            { char: 'e', price: 5, points: 7 },
            { char: 'l', price: 4, points: 3, ability: enums_1.Abilities.OtherInPosition1 },
            { char: 'a', price: 4, points: 4, ability: enums_1.Abilities.NotNextToVowel, abilityPoints: 2 },
            { char: 'n', price: 3, points: 3, ability: enums_1.Abilities.InPosition3, abilityPoints: 4 },
            { char: 'g', price: 4, points: 4, ability: enums_1.Abilities.NotNextToVowel, abilityPoints: 4 },
            { char: 'e', price: 1, points: 2 }
        ],
        target: 27,
        secretTarget: 32,
        maxTarget: 34,
        money: 18
    },
    {
        letters: [
            { char: 'c', price: 3, points: 4, ability: enums_1.Abilities.NotNextToVowel, abilityPoints: 4 },
            { char: 'a', price: 4, points: 3, ability: enums_1.Abilities.WordLength7, abilityPoints: 5 },
            { char: 'r', price: 4, points: 3, ability: enums_1.Abilities.OtherInPosition4 },
            { char: 'b', price: 4, points: 3, ability: enums_1.Abilities.NextToWild, abilityPoints: 3 },
            { char: 'i', price: 4, points: 3, ability: enums_1.Abilities.Vowels },
            { char: 'd', price: 4, points: 4, ability: enums_1.Abilities.MaxWordLength6, abilityPoints: 3 },
            { char: 'e', price: 1, points: 2 }
        ],
        target: 27,
        secretTarget: 31,
        maxTarget: 32,
        money: 18
    },
    {
        letters: [
            { char: 'b', price: 4, points: 4, ability: enums_1.Abilities.MinWordLength6, abilityPoints: 3 },
            { char: 'r', price: 3, points: 3, ability: enums_1.Abilities.InPosition4, abilityPoints: 4 },
            { char: 'a', price: 4, points: 3, ability: enums_1.Abilities.InPosition1, abilityPoints: 4 },
            { char: 'z', price: 3, points: 4, ability: enums_1.Abilities.Vowels, abilityPoints: 1 },
            { char: 'e', price: 3, points: 3, ability: enums_1.Abilities.InPositionLast, abilityPoints: 3 },
            { char: 'n', price: 1, points: 2 }
        ],
        target: 24,
        secretTarget: 30,
        maxTarget: 32,
        money: 20
    },
    {
        letters: [
            { char: 'a', price: 4, points: 4, ability: enums_1.Abilities.NextToWild, abilityPoints: 3 },
            { char: 'l', price: 4, points: 4, ability: enums_1.Abilities.InPositionLast, abilityPoints: 3 },
            { char: 'u', price: 4, points: 4, ability: enums_1.Abilities.MaxWordLength6, abilityPoints: 4 },
            { char: 'm', price: 4, points: 4, ability: enums_1.Abilities.WordLength7, abilityPoints: 3 },
            { char: 'n', price: 3, points: 3, ability: enums_1.Abilities.Vowels, abilityPoints: 1 },
            { char: 'u', price: 1, points: 2 },
            { char: 's', price: 4, points: 4, ability: enums_1.Abilities.NotNextToVowel, abilityPoints: 4 }
        ],
        target: 28,
        secretTarget: 31,
        maxTarget: 32,
        money: 18
    },
    {
        letters: [
            { char: 'm', price: 4, points: 4, ability: enums_1.Abilities.MinWordLength7, abilityPoints: 4 },
            { char: 'e', price: 4, points: 3, ability: enums_1.Abilities.NextToVowel, abilityPoints: 3 },
            { char: 'd', price: 4, points: 3, ability: enums_1.Abilities.Vowels, abilityPoints: 1 },
            { char: 'l', price: 4, points: 3, ability: enums_1.Abilities.NextToWild, abilityPoints: 3 },
            { char: 'e', price: 1, points: 2 },
            { char: 'y', price: 3, points: 4, ability: enums_1.Abilities.WordLength5, abilityPoints: 4 },
            { char: 's', price: 4, points: 4, ability: enums_1.Abilities.InPosition1, abilityPoints: 4 }
        ],
        target: 27,
        secretTarget: 30,
        maxTarget: 30,
        money: 18
    },
    {
        letters: [
            { char: 'g', price: 3, points: 4, ability: enums_1.Abilities.InPosition2, abilityPoints: 4 },
            { char: 'r', price: 4, points: 3, ability: enums_1.Abilities.NextToWild, abilityPoints: 3 },
            { char: 'a', price: 3, points: 3, ability: enums_1.Abilities.NextToVowel, abilityPoints: 4 },
            { char: 'h', price: 3, points: 4, ability: enums_1.Abilities.InPositionLast, abilityPoints: 4 },
            { char: 'a', price: 1, points: 2 },
            { char: 'm', price: 4, points: 4, ability: enums_1.Abilities.MinWordLength7, abilityPoints: 3 }
        ],
        target: 21,
        secretTarget: 24,
        maxTarget: 25,
        money: 15
    },
    {
        letters: [
            { char: 'c', price: 4, points: 3, ability: enums_1.Abilities.NextToWild, abilityPoints: 3 },
            { char: 'o', price: 4, points: 3, ability: enums_1.Abilities.WordLength7, abilityPoints: 4 },
            { char: 'r', price: 1, points: 2 },
            { char: 'd', price: 3, points: 4, ability: enums_1.Abilities.InPosition1, abilityPoints: 4 },
            { char: 'o', price: 3, points: 4, ability: enums_1.Abilities.InPosition3, abilityPoints: 4 },
            { char: 'n', price: 4, points: 3, ability: enums_1.Abilities.Wilds, abilityPoints: 1 }
        ],
        target: 28,
        secretTarget: 31,
        maxTarget: 32,
        money: 19
    },
    {
        letters: [
            { char: 'w', price: 3, points: 5, ability: enums_1.Abilities.InPosition2, abilityPoints: 4 },
            { char: 'o', price: 4, points: 3, ability: enums_1.Abilities.Vowels, abilityPoints: 1 },
            { char: 'r', price: 4, points: 3, ability: enums_1.Abilities.CopyAbilityInPosition4 },
            { char: 'k', price: 4, points: 4, ability: enums_1.Abilities.WordLength5, abilityPoints: 5 },
            { char: 'm', price: 4, points: 5, ability: enums_1.Abilities.InPositionLast, abilityPoints: 4 },
            { char: 'e', price: 1, points: 2 },
            { char: 'n', price: 5, points: 4, ability: enums_1.Abilities.OtherInPosition1 }
        ],
        target: 25,
        secretTarget: 27,
        maxTarget: 30,
        money: 17
    },
    {
        letters: [
            { char: 'l', price: 4, points: 3, ability: enums_1.Abilities.Vowels, abilityPoints: 1 },
            { char: 'o', price: 3, points: 4, ability: enums_1.Abilities.InPositionLast, abilityPoints: 5 },
            { char: 'n', price: 4, points: 4, ability: enums_1.Abilities.WordLength5, abilityPoints: 4 },
            { char: 'g', price: 3, points: 4, ability: enums_1.Abilities.NextToWild, abilityPoints: 3 },
            { char: 'e', price: 1, points: 2 },
            { char: 'r', price: 3, points: 4, ability: enums_1.Abilities.InPosition4, abilityPoints: 4 }
        ],
        target: 25,
        secretTarget: 28,
        maxTarget: 29,
        money: 16
    },
    {
        letters: [
            { char: 'c', price: 3, points: 4, ability: enums_1.Abilities.InPosition2, abilityPoints: 4 },
            { char: 'r', price: 4, points: 3, ability: enums_1.Abilities.WordLength6, abilityPoints: 4 },
            { char: 'u', price: 4, points: 3, ability: enums_1.Abilities.Wilds, abilityPoints: 1 },
            { char: 's', price: 5, points: 4, ability: enums_1.Abilities.OtherInPosition3 },
            { char: 'h', price: 5, points: 8 },
            { char: 'e', price: 1, points: 2 },
            { char: 'd', price: 4, points: 4, ability: enums_1.Abilities.Vowels, abilityPoints: 1 }
        ],
        target: 25,
        secretTarget: 30,
        maxTarget: 31,
        money: 16
    },
    {
        letters: [
            { char: 's', price: 4, points: 3, ability: enums_1.Abilities.NotNextToVowel, abilityPoints: 3 },
            { char: 'a', price: 5, points: 8 },
            { char: 'm', price: 4, points: 4, ability: enums_1.Abilities.WordLength5, abilityPoints: 3 },
            { char: 'u', price: 3, points: 3, ability: enums_1.Abilities.NextToVowel, abilityPoints: 3 },
            { char: 'r', price: 3, points: 4, ability: enums_1.Abilities.InPosition3, abilityPoints: 4 },
            { char: 'a', price: 1, points: 2 },
            { char: 'i', price: 4, points: 3, ability: enums_1.Abilities.NextToWild, abilityPoints: 3 }
        ],
        target: 26,
        secretTarget: 30,
        maxTarget: 30,
        money: 17
    },
    {
        letters: [
            { char: 'b', price: 3, points: 4, ability: enums_1.Abilities.InPosition3, abilityPoints: 4 },
            { char: 'l', price: 4, points: 3, ability: enums_1.Abilities.Vowels, abilityPoints: 1 },
            { char: 'o', price: 5, points: 9 },
            { char: 'a', price: 4, points: 3, ability: enums_1.Abilities.CopyAbilityInPosition1 },
            { char: 't', price: 4, points: 3, ability: enums_1.Abilities.NextToWild, abilityPoints: 3 },
            { char: 'e', price: 1, points: 2 },
            { char: 'd', price: 4, points: 3, ability: enums_1.Abilities.NextToVowel, abilityPoints: 3 }
        ],
        target: 27,
        secretTarget: 32,
        maxTarget: 32,
        money: 18
    },
    {
        letters: [
            { char: 't', price: 3, points: 4, ability: enums_1.Abilities.InPositionLast, abilityPoints: 4 },
            { char: 'r', price: 5, points: 8 },
            { char: 'u', price: 4, points: 4, ability: enums_1.Abilities.WordLength6, abilityPoints: 4 },
            { char: 'i', price: 4, points: 3, ability: enums_1.Abilities.Wilds, abilityPoints: 1 },
            { char: 's', price: 1, points: 2 },
            { char: 'm', price: 3, points: 4, ability: enums_1.Abilities.CopyAbilityInPosition1 }
        ],
        target: 24,
        secretTarget: 28,
        maxTarget: 29,
        money: 15
    },
    {
        letters: [
            { char: 's', price: 4, points: 3, ability: enums_1.Abilities.NextToVowel, abilityPoints: 3 },
            { char: 't', price: 3, points: 4, ability: enums_1.Abilities.InPosition4, abilityPoints: 4 },
            { char: 'y', price: 4, points: 4, ability: enums_1.Abilities.NextToWild, abilityPoints: 3 },
            { char: 'r', price: 4, points: 3, ability: enums_1.Abilities.CopyAbilityInPosition5 },
            { char: 'e', price: 4, points: 3, ability: enums_1.Abilities.MinWordLength6, abilityPoints: 3 },
            { char: 'n', price: 3, points: 4, ability: enums_1.Abilities.InPositionLast, abilityPoints: 4 },
            { char: 'e', price: 1, points: 2 }
        ],
        target: 25,
        secretTarget: 28,
        maxTarget: 30,
        money: 17
    },
    {
        letters: [
            { char: 't', price: 4, points: 3, ability: enums_1.Abilities.NotNextToVowel, abilityPoints: 4 },
            { char: 'a', price: 3, points: 4, ability: enums_1.Abilities.InPositionLast, abilityPoints: 4 },
            { char: 'n', price: 3, points: 4, ability: enums_1.Abilities.InPosition1, abilityPoints: 4 },
            { char: 'n', price: 3, points: 4, ability: enums_1.Abilities.Vowels, abilityPoints: 1 },
            { char: 'e', price: 1, points: 2 },
            { char: 'r', price: 5, points: 8 },
            { char: 's', price: 5, points: 4, ability: enums_1.Abilities.OtherInPosition2 }
        ],
        target: 30,
        secretTarget: 36,
        maxTarget: 38,
        money: 19
    },
    {
        letters: [
            { char: 'd', price: 3, points: 4, ability: enums_1.Abilities.InPosition2, abilityPoints: 4 },
            { char: 'e', price: 5, points: 0, ability: enums_1.Abilities.MinWordLength7, abilityPoints: 11 },
            { char: 'f', price: 4, points: 4, ability: enums_1.Abilities.NotNextToVowel, abilityPoints: 5 },
            { char: 'i', price: 3, points: 4, ability: enums_1.Abilities.InPosition1, abilityPoints: 5 },
            { char: 'l', price: 4, points: 3, ability: enums_1.Abilities.NextToWild, abilityPoints: 3 },
            { char: 'e', price: 1, points: 2 }
        ],
        target: 28,
        secretTarget: 31,
        maxTarget: 32,
        money: 17
    },
    {
        letters: [
            { char: 'u', price: 4, points: 4, ability: enums_1.Abilities.OtherInPosition4 },
            { char: 'r', price: 3, points: 4, ability: enums_1.Abilities.InPosition1, abilityPoints: 4 },
            { char: 'g', price: 4, points: 4, ability: enums_1.Abilities.NotNextToVowel, abilityPoints: 4 },
            { char: 'e', price: 1, points: 2 },
            { char: 'n', price: 4, points: 3, ability: enums_1.Abilities.WordLength5, abilityPoints: 4 },
            { char: 'c', price: 4, points: 3, ability: enums_1.Abilities.NextToWild, abilityPoints: 3 },
            { char: 'y', price: 4, points: 6, ability: enums_1.Abilities.MinWordLength6, abilityPoints: 4 }
        ],
        target: 29,
        secretTarget: 33,
        maxTarget: 34,
        money: 18
    },
    {
        letters: [
            { char: 'g', price: 5, points: 9 },
            { char: 'a', price: 5, points: 4, ability: enums_1.Abilities.Wilds, abilityPoints: 1 },
            { char: 'p', price: 3, points: 4, ability: enums_1.Abilities.CopyAbilityInPosition4 },
            { char: 'i', price: 1, points: 2 },
            { char: 'n', price: 4, points: 4, ability: enums_1.Abilities.NextToWild, abilityPoints: 3 },
            { char: 'g', price: 3, points: 4, ability: enums_1.Abilities.InPositionLast, abilityPoints: 4 }
        ],
        target: 28,
        secretTarget: 30,
        maxTarget: 31,
        money: 17
    },
    {
        letters: [
            { char: 'r', price: 1, points: 2 },
            { char: 'e', price: 4, points: 3, ability: enums_1.Abilities.InPosition1, abilityPoints: 4 },
            { char: 'm', price: 4, points: 4, ability: enums_1.Abilities.NextToWild, abilityPoints: 3 },
            { char: 'a', price: 4, points: 3, ability: enums_1.Abilities.Vowels, abilityPoints: 1 },
            { char: 'i', price: 3, points: 4, ability: enums_1.Abilities.WordLength6, abilityPoints: 3 },
            { char: 'n', price: 3, points: 4, ability: enums_1.Abilities.InPosition3, abilityPoints: 4 }
        ],
        target: 25,
        secretTarget: 28,
        maxTarget: 29,
        money: 16
    },
    {
        letters: [
            { char: 'f', price: 3, points: 4, ability: enums_1.Abilities.InPositionLast, abilityPoints: 4 },
            { char: 'l', price: 3, points: 4, ability: enums_1.Abilities.InPosition1, abilityPoints: 4 },
            { char: 'y', price: 4, points: 4, ability: enums_1.Abilities.WordLength6, abilityPoints: 5 },
            { char: 'w', price: 4, points: 3, ability: enums_1.Abilities.Wilds, abilityPoints: 1 },
            { char: 'a', price: 1, points: 2 },
            { char: 'y', price: 4, points: 7 },
            { char: 's', price: 3, points: 4, ability: enums_1.Abilities.NotNextToVowel, abilityPoints: 4 }
        ],
        target: 27,
        secretTarget: 31,
        maxTarget: 36,
        money: 16
    },
    {
        letters: [
            { char: 'p', price: 4, points: 3, ability: enums_1.Abilities.NextToVowel, abilityPoints: 3 },
            { char: 'i', price: 4, points: 3, ability: enums_1.Abilities.NextToWild, abilityPoints: 3 },
            { char: 'd', price: 3, points: 4, ability: enums_1.Abilities.InPosition4, abilityPoints: 4 },
            { char: 'g', price: 3, points: 4, ability: enums_1.Abilities.CopyAbilityInPosition2 },
            { char: 'i', price: 3, points: 4, ability: enums_1.Abilities.InPosition1, abilityPoints: 4 },
            { char: 'n', price: 1, points: 2 }
        ],
        target: 24,
        secretTarget: 27,
        maxTarget: 27,
        money: 16
    }
];
const getDailyGame = (dateString) => {
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
    letters.push();
    return Object.assign(Object.assign({}, game), { date: dateString, letters });
};
exports.getDailyGame = getDailyGame;
