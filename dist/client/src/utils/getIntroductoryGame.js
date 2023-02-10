"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIntroductoryGame = void 0;
const models_1 = require("../models");
const shared_1 = require("../shared");
const getIntroductoryGame = (page) => {
    if (page === models_1.Pages.tutorialGame1) {
        return {
            date: 'intro-1',
            letters: [
                { id: '11', char: 'p', price: 1, points: 2 },
                { id: '12', char: 'l', price: 4, points: 3, ability: shared_1.Abilities.NextToVowel, abilityPoints: 3 },
                { id: '13', char: 'a', price: 4, points: 3, ability: shared_1.Abilities.InPosition1, abilityPoints: 4 },
                { id: '14', char: 'y', price: 4, points: 6 },
                { id: '15', char: '', price: 1, points: 0, ability: shared_1.Abilities.Wild }
            ],
            target: 15,
            secretTarget: 17,
            maxTarget: 17,
            money: 11
        };
    }
    if (page === models_1.Pages.tutorialGame2) {
        return {
            date: 'intro-2',
            letters: [
                { id: '21', char: 'l', price: 3, points: 3, ability: shared_1.Abilities.WordLength5, abilityPoints: 4 },
                { id: '22', char: 'e', price: 1, points: 2 },
                { id: '23', char: 'a', price: 5, points: 3, ability: shared_1.Abilities.OtherInPosition1 },
                { id: '24', char: 'r', price: 5, points: 7 },
                { id: '25', char: 'n', price: 3, points: 3, ability: shared_1.Abilities.Vowels, abilityPoints: 1 },
                { id: '26', char: '', price: 1, points: 0, ability: shared_1.Abilities.Wild }
            ],
            target: 23,
            secretTarget: 26,
            maxTarget: 27,
            money: 15
        };
    }
    return {
        date: 'intro-3',
        letters: [
            { id: '31', char: 'm', price: 4, points: 4, ability: shared_1.Abilities.Vowels, abilityPoints: 1 },
            { id: '32', char: 'a', price: 1, points: 2 },
            { id: '33', char: 's', price: 3, points: 3, ability: shared_1.Abilities.NotNextToVowel, abilityPoints: 4 },
            { id: '34', char: 't', price: 4, points: 3, ability: shared_1.Abilities.NextToVowel, abilityPoints: 2 },
            { id: '35', char: 'e', price: 4, points: 3, ability: shared_1.Abilities.InPosition3, abilityPoints: 4 },
            { id: '36', char: 'r', price: 4, points: 3, ability: shared_1.Abilities.MinWordLength7, abilityPoints: 4 },
            { id: '37', char: '', price: 1, points: 0, ability: shared_1.Abilities.Wild }
        ],
        target: 27,
        secretTarget: 31,
        maxTarget: 32,
        money: 18
    };
};
exports.getIntroductoryGame = getIntroductoryGame;
//# sourceMappingURL=getIntroductoryGame.js.map