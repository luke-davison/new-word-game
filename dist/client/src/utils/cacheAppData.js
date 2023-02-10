"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheAppData = exports.SCORE_SUFFIX = exports.WORD_SUFFIX = exports.CAMPAIGN_PREFIX = exports.DAILY_STATS_PREVIX = exports.DAILY_PREFIX = exports.GAME_IDS = void 0;
exports.GAME_IDS = 'gameIds';
exports.DAILY_PREFIX = 'daily-';
exports.DAILY_STATS_PREVIX = 'dailystats-';
exports.CAMPAIGN_PREFIX = 'campaign-';
exports.WORD_SUFFIX = '-word';
exports.SCORE_SUFFIX = '-score';
const cacheAppData = (appData) => {
    cacheDate(appData.date);
    cacheDailyGame(appData.dailyGame);
    cacheCampaignGame(appData.campaignGame);
};
exports.cacheAppData = cacheAppData;
const cacheDate = (dateString) => {
    const gameIdsString = window.localStorage.getItem(exports.GAME_IDS);
    const gameIds = new Set(gameIdsString ? gameIdsString.split(',') : []);
    gameIds.add(dateString);
    window.localStorage.setItem(exports.GAME_IDS, Array.from(gameIds).join(','));
};
const cacheDailyGame = (game) => {
    window.localStorage.setItem(exports.DAILY_PREFIX + game.date, JSON.stringify(game));
};
const cacheCampaignGame = (game) => {
    window.localStorage.setItem(exports.CAMPAIGN_PREFIX + game.date, JSON.stringify(game));
};
//# sourceMappingURL=cacheAppData.js.map