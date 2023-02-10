"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateBestScoreForWord = exports.getBestWords = void 0;
const shared_1 = require("../../client/src/shared");
const utils_1 = require("../../client/src/shared/utils");
const getWordPoints_1 = require("../../client/src/shared/utils/getWordPoints");
const setupLetters_1 = require("../../client/src/shared/utils/setupLetters");
const getBestWords = (game, printScore) => {
    const map = new Map();
    const words = new Map();
    utils_1.wordlist.forEach(word => {
        var _a;
        const points = (0, exports.calculateBestScoreForWord)(game, word);
        // console.log(word, points)
        if (map.has(points)) {
            map.set(points, map.get(points) + 1);
        }
        else {
            map.set(points, 1);
        }
        if (points >= printScore) {
            if (words.has(points)) {
                (_a = words.get(points)) === null || _a === void 0 ? void 0 : _a.push(word);
            }
            else {
                words.set(points, [word]);
            }
        }
    });
    const pointsArray = Array.from(map).sort((a, b) => a[0] - b[0]);
    pointsArray.forEach(([points]) => {
        if (points >= printScore) {
            console.log();
            console.log(points);
            const wordsArray = words.get(points);
            wordsArray === null || wordsArray === void 0 ? void 0 : wordsArray.forEach(word => {
                console.log(word);
            });
        }
    });
    console.log();
    pointsArray.forEach(([points, num]) => {
        console.log(points, '-', num);
    });
    console.log();
};
exports.getBestWords = getBestWords;
const calculateBestScoreForWord = (game, word) => {
    const shop = (0, setupLetters_1.setupLetters)(game.letters);
    const letters = word.split('');
    const doThing = (wordSoFar, lettersRemaining) => {
        const [nextLetter, ...otherLetters] = lettersRemaining;
        return shop.reduce((highestScore, shopLetter) => {
            if (nextLetter !== shopLetter.char && shopLetter.ability !== shared_1.Abilities.Wild) {
                return highestScore;
            }
            const newLetter = shopLetter.ability === shared_1.Abilities.Wild
                ? Object.assign(Object.assign({}, shopLetter.data), { char: nextLetter })
                : shopLetter;
            const newWordSoFar = [...wordSoFar, newLetter];
            if (otherLetters.length === 0) {
                const spent = newWordSoFar.reduce((sum, letter) => sum + letter.price, 0);
                if (spent > game.money) {
                    return highestScore;
                }
                const score = (0, getWordPoints_1.getWordPoints)(newWordSoFar);
                return Math.max(score, highestScore);
            }
            const thingScore = doThing(newWordSoFar, otherLetters);
            return Math.max(thingScore, highestScore);
        }, 0);
    };
    return doThing([], letters);
};
exports.calculateBestScoreForWord = calculateBestScoreForWord;
//# sourceMappingURL=getBestWords.js.map