"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LetterPopup = void 0;
require("./styles/LetterPopup.css");
const react_1 = __importDefault(require("react"));
const shared_1 = require("../../../shared");
const getAbilityText_1 = require("../../../utils/getAbilityText");
const AbilityImage_1 = require("./AbilityImage");
const Alphabet_1 = require("./Alphabet");
const Popup_1 = require("../../general/Popup");
const LetterPopup = (_a) => {
    var { letter } = _a, props = __rest(_a, ["letter"]);
    const onSelect = (character) => {
        letter.setWildLetter(character);
        props.onClose();
    };
    return (<Popup_1.Popup {...props}>
      {letter.ability && (<div className="letter-popup-ability-image">
          <AbilityImage_1.AbilityImage ability={letter.ability}/>
        </div>)}
      <div className="letter-popup-ability-text">
        {letter.ability ? (0, getAbilityText_1.getAbilityText)(letter.ability) : 'This letter has no ability'}
      </div>
      {letter.position !== undefined && letter.ability === shared_1.Abilities.Wild && (<Alphabet_1.Alphabet onSelect={onSelect}/>)}
    </Popup_1.Popup>);
};
exports.LetterPopup = LetterPopup;
//# sourceMappingURL=LetterPopup.js.map