"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlayerAfterSubmit = void 0;
const enums_1 = require("../../../src/shared/enums");
const utils_1 = require("../../../src/shared/utils");
const getWordPoints_1 = require("../../../src/shared/utils/getWordPoints");
const convertWordToLetters_1 = require("../utils/convertWordToLetters");
const getFundingFromLetters_1 = require("../utils/getFundingFromLetters");
const getInventoryAfterSubmit_1 = require("../utils/getInventoryAfterSubmit");
const getNextEndOfCampaignDateString_1 = require("../utils/getNextEndOfCampaignDateString");
const getPlayerAfterSubmit = (body, campaignGame, player) => {
    const letters = (0, convertWordToLetters_1.convertWordToLetters)(body.word, campaignGame, player);
    const points = ((player === null || player === void 0 ? void 0 : player.points) || 0) + (0, getWordPoints_1.getWordPoints)(letters);
    const funding = ((player === null || player === void 0 ? void 0 : player.funding) || 0) + (0, getFundingFromLetters_1.getFundingFromLetters)(letters);
    const isMember = (player === null || player === void 0 ? void 0 : player.isMember) || letters.some(letter => letter.ability === enums_1.Abilities.Club);
    const inventory = (0, getInventoryAfterSubmit_1.getInventoryAfterSubmit)(letters, player === null || player === void 0 ? void 0 : player.inventory);
    const lastSubmit = campaignGame.date;
    const newPlayer = {
        startDate: (player === null || player === void 0 ? void 0 : player.startDate) || campaignGame.date,
        endDate: (player === null || player === void 0 ? void 0 : player.endDate) || (0, getNextEndOfCampaignDateString_1.getNextEndOfCampaignDateString)((0, utils_1.getDateFromString)(campaignGame.date)),
        userId: (player === null || player === void 0 ? void 0 : player.userId) || body.userId,
        inventory,
        isMember,
        funding,
        points,
        lastSubmit
    };
    return newPlayer;
};
exports.getPlayerAfterSubmit = getPlayerAfterSubmit;
//# sourceMappingURL=getPlayerAfterSubmit.js.map