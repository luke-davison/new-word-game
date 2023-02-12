"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppData = void 0;
const getCampaignGame_1 = require("../games/getCampaignGame");
const getDailyGame_1 = require("../games/getDailyGame");
const getTodayDateString_1 = require("../utils/getTodayDateString");
const getAppData = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const date = (0, getTodayDateString_1.getTodayDateString)();
    const dailyGame = (0, getDailyGame_1.getDailyGame)(date);
    const campaignGame = (0, getCampaignGame_1.getCampaignGame)(date);
    if (!dailyGame) {
        return response.status(500).send('Could not load data - unable to find daily game');
    }
    if (!campaignGame) {
        return response.status(500).send('Could not load data - unable to find campaign game');
    }
    const appData = {
        date,
        dailyGame,
        campaignGame
    };
    response.json(appData);
});
exports.getAppData = getAppData;
