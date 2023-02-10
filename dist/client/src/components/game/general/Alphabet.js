"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Alphabet = void 0;
require("./styles/Alphabet.css");
const mobx_react_lite_1 = require("mobx-react-lite");
const react_1 = __importStar(require("react"));
const alphabet = 'abcdefghijklmnopqrstuvwxyz ';
const alphabetSplit = ['abcdefghi', 'jklmnopqr', 'stuvwxyz '];
exports.Alphabet = (0, mobx_react_lite_1.observer)(({ onSelect }) => {
    (0, react_1.useEffect)(() => {
        const listener = (event) => {
            const letters = alphabet.split('');
            if (letters.indexOf(event.key.toLowerCase()) !== -1) {
                onSelect(event.key);
            }
        };
        document.body.addEventListener('keydown', listener);
        return () => document.body.removeEventListener('keydown', listener);
    }, [onSelect]);
    const onKeyDown = (e) => {
        onSelect(e.key);
    };
    return (<div className="alphabet-container" onKeyDown={onKeyDown} tabIndex={0}>
      {alphabetSplit.map((row, index) => (<div key={index} className="alphabet-row">
          {row.split('').map((letter, index) => (<div key={index} className="alphabet-letter" onClick={() => onSelect(letter)}>
              {letter}
            </div>))}
        </div>))}
    </div>);
});
//# sourceMappingURL=Alphabet.js.map