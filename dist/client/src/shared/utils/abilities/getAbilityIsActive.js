"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAbilityIsActive = void 0;
const enums_1 = require("../../enums");
const getIsNextToVowelActive_1 = require("./getIsNextToVowelActive");
const getNextToWildActive_1 = require("./getNextToWildActive");
const getVowelsActive_1 = require("./getVowelsActive");
const getWildsActive_1 = require("./getWildsActive");
const getIsAnotherAbilityInPosition_1 = require("./getIsAnotherAbilityInPosition");
const getAbilityIsActive = (word, position, player) => {
    const letter = word[position];
    if (!letter) {
        return false;
    }
    switch (letter.ability) {
        case enums_1.Abilities.Club: return !(player === null || player === void 0 ? void 0 : player.isMember);
        case enums_1.Abilities.CopyAbilityInPosition1: return (0, getIsAnotherAbilityInPosition_1.getIsAnotherAbilityInPosition)(word, 0);
        case enums_1.Abilities.CopyAbilityInPosition2: return (0, getIsAnotherAbilityInPosition_1.getIsAnotherAbilityInPosition)(word, 1);
        case enums_1.Abilities.CopyAbilityInPosition3: return (0, getIsAnotherAbilityInPosition_1.getIsAnotherAbilityInPosition)(word, 2);
        case enums_1.Abilities.CopyAbilityInPosition4: return (0, getIsAnotherAbilityInPosition_1.getIsAnotherAbilityInPosition)(word, 3);
        case enums_1.Abilities.CopyAbilityInPosition5: return (0, getIsAnotherAbilityInPosition_1.getIsAnotherAbilityInPosition)(word, 4);
        case enums_1.Abilities.Funding1: return true;
        case enums_1.Abilities.Funding2: return true;
        case enums_1.Abilities.InPosition1: return position === 0;
        case enums_1.Abilities.InPosition2: return position === 1;
        case enums_1.Abilities.InPosition3: return position === 2;
        case enums_1.Abilities.InPosition4: return position === 3;
        case enums_1.Abilities.InPositionLast: return position === word.length - 1;
        case enums_1.Abilities.MaxWordLength4: return word.length <= 4;
        case enums_1.Abilities.MaxWordLength5: return word.length <= 5;
        case enums_1.Abilities.MaxWordLength6: return word.length <= 6;
        case enums_1.Abilities.MaxWordLength7: return word.length <= 7;
        case enums_1.Abilities.MinWordLength4: return word.length >= 4;
        case enums_1.Abilities.MinWordLength5: return word.length >= 5;
        case enums_1.Abilities.MinWordLength6: return word.length >= 6;
        case enums_1.Abilities.MinWordLength7: return word.length >= 7;
        case enums_1.Abilities.NextToVowel: return (0, getIsNextToVowelActive_1.getIsNextToVowelActive)(word, position);
        case enums_1.Abilities.NextToWild: return (0, getNextToWildActive_1.getIsNextToWildActive)(word, position);
        case enums_1.Abilities.NotNextToVowel: return !(0, getIsNextToVowelActive_1.getIsNextToVowelActive)(word, position);
        case enums_1.Abilities.NotNextToWild: return !(0, getNextToWildActive_1.getIsNextToWildActive)(word, position);
        case enums_1.Abilities.OtherInPosition1: return word.length >= 1;
        case enums_1.Abilities.OtherInPosition2: return word.length >= 2;
        case enums_1.Abilities.OtherInPosition3: return word.length >= 3;
        case enums_1.Abilities.OtherInPosition4: return word.length >= 4;
        case enums_1.Abilities.OtherInPosition5: return word.length >= 5;
        case enums_1.Abilities.Retain: return true;
        case enums_1.Abilities.RetainLeft: return position > 0;
        case enums_1.Abilities.RetainRight: return position < word.length - 1;
        case enums_1.Abilities.Vowels: return (0, getVowelsActive_1.getVowelsActive)(word);
        case enums_1.Abilities.Wild: return true;
        case enums_1.Abilities.Wilds: return (0, getWildsActive_1.getWildsActive)(word);
        case enums_1.Abilities.WordLength4: return word.length === 4;
        case enums_1.Abilities.WordLength5: return word.length === 5;
        case enums_1.Abilities.WordLength6: return word.length === 6;
        case enums_1.Abilities.WordLength7: return word.length === 7;
        default: return false;
    }
};
exports.getAbilityIsActive = getAbilityIsActive;
