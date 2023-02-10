"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LetterInstance = void 0;
const mobx_1 = require("mobx");
const shared_1 = require("../shared");
let nextLetterInstanceId = 1;
class LetterInstance {
    constructor(parent, position) {
        this.setPosition = (position) => {
            this.position = position;
        };
        this.setWildLetter = (char) => {
            this._char = char;
        };
        (0, mobx_1.makeObservable)(this, {
            _char: mobx_1.observable,
            position: mobx_1.observable,
            setPosition: mobx_1.action,
            setWildLetter: mobx_1.action
        });
        this.id = String(nextLetterInstanceId++);
        this.parent = parent;
        this.position = position;
    }
    get letterId() { return this.parent.id; }
    get color() { return this.parent.color; }
    get char() { return this._char === undefined ? this.parent.char : this._char; }
    get price() { return this.parent.price; }
    get points() { return this.parent.points; }
    get ability() { return this.parent.ability; }
    get abilityPoints() { return this.parent.abilityPoints; }
    get isWild() { return this.ability === shared_1.Abilities.Wild; }
}
exports.LetterInstance = LetterInstance;
//# sourceMappingURL=LetterInstance.js.map