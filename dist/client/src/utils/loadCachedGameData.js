"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadCachedGameData = void 0;
const cacheAppData_1 = require("./cacheAppData");
const loadCachedGameData = () => {
    const gameIdsString = window.localStorage.getItem(cacheAppData_1.GAME_IDS);
    if (!gameIdsString) {
        return undefined;
    }
    const games = new Map();
    const scores = new Map();
    const words = new Map();
    const dateStrings = gameIdsString.split(',');
    const filteredDates = dateStrings.filter(dateString => {
        const gameString = window.localStorage.getItem(cacheAppData_1.DAILY_PREFIX + dateString);
        if (!gameString) {
            return false;
        }
        try {
            const game = JSON.parse(gameString);
            games.set(dateString, game);
        }
        catch (_a) {
            console.log('Unable to parse daily game', gameString);
        }
        const scoreString = window.localStorage.getItem(cacheAppData_1.DAILY_PREFIX + dateString + cacheAppData_1.SCORE_SUFFIX);
        if (scoreString) {
            scores.set(dateString, Number(scoreString));
        }
        const wordString = window.localStorage.getItem(cacheAppData_1.DAILY_PREFIX + dateString + cacheAppData_1.WORD_SUFFIX);
        if (wordString) {
            try {
                const word = JSON.parse(wordString);
                words.set(dateString, word);
            }
            catch (_b) {
                console.log('Unable to parse daily word', gameString);
            }
        }
        if (!scores.has(dateString) || !words.has(dateString)) {
            scores.delete(dateString);
            words.delete(dateString);
            return false;
        }
        return true;
    });
    return { dates: filteredDates, games, scores, words };
};
exports.loadCachedGameData = loadCachedGameData;
//# sourceMappingURL=loadCachedGameData.js.map