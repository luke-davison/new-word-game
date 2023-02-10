"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextEndOfCampaignDateString = void 0;
const utils_1 = require("../../client/src/shared/utils");
const getNextEndOfCampaignDateString = (date) => {
    const dayOfWeek = date.getDay();
    const endOfWeekDate = new Date(date.getTime());
    endOfWeekDate.setDate(date.getDate() + 6 - dayOfWeek);
    return (0, utils_1.getDateString)(endOfWeekDate);
};
exports.getNextEndOfCampaignDateString = getNextEndOfCampaignDateString;
//# sourceMappingURL=getNextEndOfCampaignDateString.js.map