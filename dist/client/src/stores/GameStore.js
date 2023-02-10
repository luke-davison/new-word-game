"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameStore = void 0;
const mobx_1 = require("mobx");
const LetterInstance_1 = require("../models/LetterInstance");
const utils_1 = require("../shared/utils");
const getAbilityIsActive_1 = require("../shared/utils/abilities/getAbilityIsActive");
const getAbilityPoints_1 = require("../shared/utils/abilities/getAbilityPoints");
const setupLetters_1 = require("../shared/utils/setupLetters");
const cacheAppData_1 = require("../utils/cacheAppData");
const convertLettersToWord_1 = require("../utils/convertLettersToWord");
const convertWordToLetterInstances_1 = require("../utils/convertWordToLetterInstances");
const getIntroductoryGame_1 = require("../utils/getIntroductoryGame");
class GameStore {
    constructor(appStore) {
        var _a, _b, _c;
        this.appStore = appStore;
        this._shopLetters = [];
        this._inventory = [];
        this._secretShopLetters = [];
        this.playerWordData = [];
        this.onDropLetter = (droppedLetter, position) => {
            let letter;
            if (droppedLetter.position === undefined) {
                letter = new LetterInstance_1.LetterInstance(droppedLetter.parent, position);
                letter.parent.onPlaceLetter();
            }
            else {
                letter = droppedLetter;
                letter.setPosition(position);
            }
            if (letter.position === undefined) {
                letter.parent.onPlaceLetter();
            }
            letter.setPosition(position);
            this.playerWordData = [
                ...this.playerWord.filter(otherLetter => otherLetter.id !== letter.id && (letter.position === undefined || otherLetter.position !== letter.position)),
                letter
            ];
        };
        this.onDropLetterBetween = (droppedLetter, position) => {
            const findNextEmpty = (nextPosition) => {
                if (this.playerWord.some(letter => letter.position === nextPosition)) {
                    return findNextEmpty(nextPosition + 1);
                }
                return nextPosition;
            };
            const nextEmptyPosition = findNextEmpty(position);
            for (let i = nextEmptyPosition - 1; i >= position; i--) {
                const existingLetter = this.playerWord.find(letter => letter.position === i);
                if (existingLetter) {
                    existingLetter.position = (existingLetter.position || 0) + 1;
                }
            }
            let letter;
            if (droppedLetter.position === undefined) {
                letter = new LetterInstance_1.LetterInstance(droppedLetter.parent, position);
                letter.parent.onPlaceLetter();
            }
            else {
                letter = droppedLetter;
                letter.setPosition(position);
            }
            this.playerWordData.push(letter);
        };
        this.onDropLetterOutside = (letter) => {
            if (letter.position !== undefined) {
                this.playerWordData = this.playerWord.filter(otherLetter => otherLetter.id !== letter.id);
                letter.parent.onUnplaceLetter();
            }
        };
        this.onClickLetter = (letter) => {
            if (letter.isWild) {
                setTimeout(() => {
                    // check whether letter has been removed
                    if (this.playerWord.some(otherLetter => otherLetter.id === letter.id)) {
                        const newValue = prompt('Enter a letter');
                        letter.setWildLetter(newValue || '');
                    }
                }, 300);
            }
        };
        this.onQuickAddLetter = (letter) => {
            let nextPosition = 0;
            for (let i = 0; i < this.playerWord.length; i++) {
                if (this.playerWord.some(otherLetter => otherLetter.position === i)) {
                    nextPosition++;
                }
                else {
                    break;
                }
            }
            this.onDropLetter(letter, nextPosition);
        };
        this.onQuickRemoveLetter = (letter) => {
            this.onDropLetterOutside(letter);
        };
        this.onClear = () => {
            this.playerWordData = [];
        };
        this.reinstateBestWord = () => {
            if (this.bestLetters) {
                const letters = [
                    ...this._shopLetters,
                    ...this._inventory,
                    ...this._secretShopLetters
                ];
                this.playerWordData = (0, convertWordToLetterInstances_1.convertWordToLetterInstances)(this.bestLetters, letters);
            }
        };
        this.getIsLetterUsed = (letter) => {
            return this.playerWord.some(wordLetter => wordLetter.parent.id === letter.parent.id);
        };
        (0, mobx_1.makeObservable)(this, {
            _shopLetters: mobx_1.observable,
            playerWordData: mobx_1.observable,
            money: mobx_1.computed,
            isValidWord: mobx_1.computed,
            isRealWord: mobx_1.computed,
            wordPoints: mobx_1.computed,
            onDropLetter: mobx_1.action,
            onDropLetterBetween: mobx_1.action,
            onDropLetterOutside: mobx_1.action,
            playerWord: mobx_1.computed,
            playerWordFull: mobx_1.computed,
            target: mobx_1.computed,
            isValidText: mobx_1.observable,
            _bestWord: mobx_1.observable,
            bestWordScore: mobx_1.observable,
            bestLetters: mobx_1.observable,
            onClear: mobx_1.action,
            wordLetters: mobx_1.computed,
            inventory: mobx_1.computed,
            _secretShopLetters: mobx_1.observable,
            shopLetters: mobx_1.computed,
            secretShopLetters: mobx_1.computed,
            reinstateBestWord: mobx_1.action
        });
        (0, mobx_1.runInAction)(() => {
            var _a, _b;
            const bestWord = window.localStorage.getItem(cacheAppData_1.DAILY_PREFIX + ((_a = this.game) === null || _a === void 0 ? void 0 : _a.date) + cacheAppData_1.WORD_SUFFIX) || '';
            if (bestWord) {
                const letters = JSON.parse(bestWord);
                if (letters) {
                    this._bestWord = letters.map(({ char }) => char).join('');
                    this.bestWordScore = Number(window.localStorage.getItem(cacheAppData_1.DAILY_PREFIX + ((_b = this.game) === null || _b === void 0 ? void 0 : _b.date) + cacheAppData_1.SCORE_SUFFIX) || 0);
                    this.bestLetters = letters;
                }
            }
        });
        (0, mobx_1.reaction)(() => this.wordLetters, () => {
            this.isValidText = undefined;
            window.clearTimeout(this.validWordTimeout);
            this.validWordTimeout = window.setTimeout((0, mobx_1.action)(() => {
                var _a, _b;
                if (this.isCompleteWord) {
                    if (this.isValidWord) {
                        this.isValidText = 'Valid word';
                        if (this.wordPoints >= (this.bestWordScore || 0)) {
                            this.bestWordScore = this.wordPoints;
                            this._bestWord = this.playerWord.map(letter => letter.char).join('');
                            this.bestLetters = (0, convertLettersToWord_1.convertLetterInstancesToWord)(this.playerWord);
                            window.localStorage.setItem(cacheAppData_1.DAILY_PREFIX + ((_a = this.game) === null || _a === void 0 ? void 0 : _a.date) + cacheAppData_1.WORD_SUFFIX, JSON.stringify(this.bestLetters));
                            window.localStorage.setItem(cacheAppData_1.DAILY_PREFIX + ((_b = this.game) === null || _b === void 0 ? void 0 : _b.date) + cacheAppData_1.SCORE_SUFFIX, String(this.bestWordScore));
                        }
                    }
                    else if (this.money < 0) {
                        this.isValidText = 'Not enough money';
                    }
                    else {
                        this.isValidText = 'Not a word';
                    }
                }
            }), 1500);
        });
        this._shopLetters = (0, setupLetters_1.setupLetters)((_a = this.game) === null || _a === void 0 ? void 0 : _a.letters);
        if (appStore.isPlayingCampaignGame) {
            if ((_b = appStore.player) === null || _b === void 0 ? void 0 : _b.inventory) {
                this._inventory = (0, setupLetters_1.setupLetters)(appStore.player.inventory);
            }
            this._secretShopLetters = (0, setupLetters_1.setupLetters)((_c = this.campaignGame) === null || _c === void 0 ? void 0 : _c.memberLetters);
        }
    }
    get dailyGame() {
        return this.appStore.dailyGame;
    }
    get campaignGame() {
        return this.appStore.campaignGame;
    }
    get tutorialGame() {
        return (0, getIntroductoryGame_1.getIntroductoryGame)(this.appStore.currentPage);
    }
    get previousGame() {
        return this.appStore.previousGame;
    }
    get game() {
        if (this.appStore.isPlayingDailyGame) {
            return this.dailyGame;
        }
        if (this.appStore.isPlayingCampaignGame) {
            return this.campaignGame;
        }
        if (this.appStore.isPlayingTutorialGame) {
            return this.tutorialGame;
        }
        if (this.appStore.isPlayingPreviousGame) {
            return this.previousGame;
        }
        return undefined;
    }
    get shopLetters() {
        return this._shopLetters.map(letter => {
            return new LetterInstance_1.LetterInstance(letter);
        });
    }
    get inventory() {
        return this._inventory.map(letter => {
            return new LetterInstance_1.LetterInstance(letter);
        });
    }
    get secretShopLetters() {
        var _a;
        if (!((_a = this.appStore.player) === null || _a === void 0 ? void 0 : _a.isMember)) {
            return [];
        }
        return this._secretShopLetters.map(letter => {
            return new LetterInstance_1.LetterInstance(letter);
        });
    }
    get playerWord() {
        return Array.from(this.playerWordData).sort((a, b) => {
            return (a.position || 0) - (b.position || 0);
        });
    }
    get playerWordFull() {
        const lastLetter = this.playerWord[this.playerWord.length - 1];
        return [...new Array((lastLetter === null || lastLetter === void 0 ? void 0 : lastLetter.position) === undefined ? 0 : lastLetter.position + 1)].map((_, index) => {
            return this.playerWord.find(letter => letter.position === index);
        });
    }
    get totalMoney() {
        var _a, _b;
        let money = ((_a = this.game) === null || _a === void 0 ? void 0 : _a.money) || 0;
        if (this.appStore.isPlayingCampaignGame && ((_b = this.appStore.player) === null || _b === void 0 ? void 0 : _b.funding)) {
            money += this.appStore.player.funding;
        }
        return money;
    }
    get money() {
        return this.totalMoney - this.playerWord.reduce((sum, letter) => sum + letter.price, 0);
    }
    get isRealWord() {
        return (0, utils_1.getIsValidWord)(this.playerWord);
    }
    get isValidWord() {
        return this.isRealWord && this.money >= 0;
    }
    get isCompleteWord() {
        const highestPosition = this.playerWord.reduce((high, letter) => {
            const { position = 0 } = letter;
            return position > high ? position : high;
        }, 0);
        if (highestPosition > this.playerWord.length - 1) {
            return false;
        }
        if (this.playerWord.some(letter => letter.isWild && !letter.char)) {
            return false;
        }
        return true;
    }
    get wordPoints() {
        const sortedWord = Array.from(this.playerWord).sort((a, b) => {
            return (a.position || 0) - (b.position || 0);
        });
        return sortedWord.reduce((sum, letter) => {
            const basePoints = letter.points;
            let abilityPoints = 0;
            if ((0, getAbilityIsActive_1.getAbilityIsActive)(this.playerWordFull, letter.position, this.appStore.player)) {
                abilityPoints = (0, getAbilityPoints_1.getAbilityPoints)(this.playerWordFull, letter.position, this.appStore.player);
            }
            return sum + basePoints + abilityPoints;
        }, 0);
    }
    get wordLetters() {
        return this.playerWord.map(letter => letter.char);
    }
    get target() {
        var _a, _b;
        return this.appStore.isPlayingTutorialGame ? (_a = this.tutorialGame) === null || _a === void 0 ? void 0 : _a.target : (_b = this.dailyGame) === null || _b === void 0 ? void 0 : _b.target;
    }
    get secretTarget() {
        var _a;
        return (_a = this.dailyGame) === null || _a === void 0 ? void 0 : _a.secretTarget;
    }
    get bestWord() {
        if (!this._bestWord) {
            return '';
        }
        return this._bestWord.slice(0, 1).toUpperCase() + this._bestWord.slice(1);
    }
}
exports.GameStore = GameStore;
//# sourceMappingURL=GameStore.js.map