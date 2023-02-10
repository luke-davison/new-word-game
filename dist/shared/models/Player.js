"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const mobx_1 = require("mobx");
const setupLetters_1 = require("../utils/setupLetters");
class Player {
    constructor(data) {
        this.inventory = [];
        (0, mobx_1.makeObservable)(this, {
            inventory: mobx_1.observable
        });
        this.data = data;
        this.inventory = (0, setupLetters_1.setupLetters)(this.data.inventory);
        this.funding = this.data.funding;
        this.isMember = this.data.isMember;
        this.points = this.data.points;
    }
}
exports.Player = Player;
//# sourceMappingURL=Player.js.map