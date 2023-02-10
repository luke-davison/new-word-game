"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Letter = void 0;
const mobx_1 = require("mobx");
class Letter {
    constructor(data, limit) {
        this.onPlaceLetter = () => {
            if (this.limit !== undefined) {
                this.limit -= 1;
            }
        };
        this.onUnplaceLetter = () => {
            if (this.limit !== undefined) {
                this.limit += 1;
            }
        };
        this.data = data;
        this.limit = limit;
        (0, mobx_1.makeObservable)(this, {
            limit: mobx_1.observable,
            onPlaceLetter: mobx_1.action,
            onUnplaceLetter: mobx_1.action
        });
    }
    get id() { return this.data.id; }
    get color() { return this.data.color; }
    get char() { return this.data.char; }
    get price() { return this.data.price; }
    get points() { return this.data.points; }
    get ability() { return this.data.ability; }
    get abilityPoints() { return this.data.abilityPoints; }
}
exports.Letter = Letter;
//# sourceMappingURL=Letter.js.map