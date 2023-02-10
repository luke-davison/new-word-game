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
exports.AppStore = void 0;
const mobx_1 = require("mobx");
const getAppData_1 = require("../api/getAppData");
const models_1 = require("../models");
const shared_1 = require("../shared");
const cacheAppData_1 = require("../utils/cacheAppData");
const loadCachedGameData_1 = require("../utils/loadCachedGameData");
class AppStore {
    constructor() {
        this.isLoading = true;
        this.isError = false;
        this.offlineMode = false;
        this.previousGame = undefined;
        this.fetchingAppData = true;
        this.loadAppData = () => __awaiter(this, void 0, void 0, function* () {
            const userId = window.localStorage.getItem('userId');
            try {
                const appData = yield (0, getAppData_1.getAppData)(userId || undefined);
                (0, mobx_1.runInAction)(() => {
                    this._appData = appData;
                    this.fetchingAppData = false;
                });
                (0, cacheAppData_1.cacheAppData)(appData);
            }
            catch (error) {
                (0, mobx_1.runInAction)(() => {
                    this.isError = true;
                    this.offlineMode = true;
                });
            }
            finally {
                (0, mobx_1.runInAction)(() => {
                    this.isLoading = false;
                });
            }
        });
        this.currentPage = models_1.Pages.menu;
        this.startDailyGame = () => {
            this.currentPage = models_1.Pages.dailyGame;
        };
        this.startCampaignGame = () => {
            this.currentPage = models_1.Pages.campaignGame;
        };
        this.startTutorialGame = () => {
            this.currentPage = models_1.Pages.tutorialGame1;
        };
        this.setTutorialGame = (num) => {
            if (num === 1) {
                this.currentPage = models_1.Pages.tutorialGame1;
            }
            else if (num === 2) {
                this.currentPage = models_1.Pages.tutorialGame2;
            }
            else if (num === 3) {
                this.currentPage = models_1.Pages.tutorialGame3;
            }
        };
        this.returnToMenu = () => {
            this.currentPage = models_1.Pages.menu;
        };
        this.openPreviousGamesMenu = () => {
            this.currentPage = models_1.Pages.previousGamesMenu;
        };
        this.startPreviousGame = (game) => {
            this.previousGame = game;
            this.currentPage = models_1.Pages.previousGame;
        };
        this.cachedGameDates = undefined;
        this.cachedGames = new Map();
        this.cachedWords = new Map();
        this.cachedScores = new Map();
        this.loadCachedGameData = () => {
            this.cachedGameDates = undefined;
            const cachedGameData = (0, loadCachedGameData_1.loadCachedGameData)();
            if (cachedGameData) {
                (0, mobx_1.runInAction)(() => {
                    this.cachedGameDates = cachedGameData.dates;
                    this.cachedGames = cachedGameData.games;
                    this.cachedWords = cachedGameData.words;
                    this.cachedScores = cachedGameData.scores;
                });
            }
        };
        (0, mobx_1.makeObservable)(this, {
            currentPage: mobx_1.observable,
            isPlayingDailyGame: mobx_1.computed,
            startDailyGame: mobx_1.action,
            returnToMenu: mobx_1.action,
            isPlayingCampaignGame: mobx_1.computed,
            startCampaignGame: mobx_1.action,
            _appData: mobx_1.observable,
            isLoading: mobx_1.observable,
            isError: mobx_1.observable,
            isPlayingTutorialGame: mobx_1.computed,
            startTutorialGame: mobx_1.action,
            setTutorialGame: mobx_1.action,
            gameId: mobx_1.computed,
            tutorialGameInProgress: mobx_1.computed,
            offlineMode: mobx_1.observable,
            isPreviousGamesMenuOpen: mobx_1.computed,
            openPreviousGamesMenu: mobx_1.action,
            startPreviousGame: mobx_1.action,
            previousGame: mobx_1.observable,
            isPlayingPreviousGame: mobx_1.computed,
            cachedGameDates: mobx_1.observable,
            cachedGames: mobx_1.observable,
            cachedScores: mobx_1.observable,
            cachedWords: mobx_1.observable,
            loadCachedGameData: mobx_1.action
        });
    }
    get dateString() {
        var _a;
        return (_a = this._appData) === null || _a === void 0 ? void 0 : _a.date;
    }
    get gameId() {
        var _a;
        if (this.isPlayingDailyGame) {
            return this.dateString;
        }
        if (this.isPlayingCampaignGame) {
            return this.dateString;
        }
        if (this.isPlayingTutorialGame) {
            return 'intro-' + this.tutorialGameInProgress;
        }
        if (this.isPlayingPreviousGame) {
            return (_a = this.previousGame) === null || _a === void 0 ? void 0 : _a.date;
        }
        return undefined;
    }
    get today() {
        return this.dateString ? (0, shared_1.getDateFromString)(this.dateString) : new Date();
    }
    get dailyGame() {
        var _a;
        return (_a = this._appData) === null || _a === void 0 ? void 0 : _a.dailyGame;
    }
    get campaignGame() {
        var _a;
        return (_a = this._appData) === null || _a === void 0 ? void 0 : _a.campaignGame;
    }
    get player() {
        return {
            inventory: [{ id: 'asdf', price: 1, points: 4, ability: shared_1.Abilities.Retain, char: 'e' }, { id: 'asdf2', price: 1, points: 4, ability: shared_1.Abilities.Retain, char: 'f' }],
            funding: 0,
            isMember: true,
            points: 0,
            lastSubmit: ''
        };
    }
    get isPlayingDailyGame() {
        return this.currentPage === models_1.Pages.dailyGame;
    }
    get isPlayingCampaignGame() {
        return this.currentPage === models_1.Pages.campaignGame;
    }
    get isPlayingTutorialGame() {
        return this.currentPage === models_1.Pages.tutorialGame1
            || this.currentPage === models_1.Pages.tutorialGame2
            || this.currentPage === models_1.Pages.tutorialGame3;
    }
    get isPlayingPreviousGame() {
        return this.currentPage === models_1.Pages.previousGame;
    }
    get tutorialGameInProgress() {
        switch (this.currentPage) {
            case models_1.Pages.tutorialGame1: return 1;
            case models_1.Pages.tutorialGame2: return 2;
            case models_1.Pages.tutorialGame3: return 3;
            default: return 0;
        }
    }
    get isPreviousGamesMenuOpen() {
        return this.currentPage === models_1.Pages.previousGamesMenu;
    }
}
exports.AppStore = AppStore;
//# sourceMappingURL=AppStore.js.map