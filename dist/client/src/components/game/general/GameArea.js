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
exports.GameArea = void 0;
require("./styles/GameArea.css");
const mobx_react_lite_1 = require("mobx-react-lite");
const react_1 = __importStar(require("react"));
const react_dnd_1 = require("react-dnd");
const GameContext_1 = require("../../../stores/GameContext");
const CampaignCounters_1 = require("../campaign/CampaignCounters");
const Counters_1 = require("./Counters");
const LetterShop_1 = require("./LetterShop");
const PlayerArea_1 = require("./PlayerArea");
exports.GameArea = (0, mobx_react_lite_1.observer)(() => {
    const { onDropLetterOutside } = (0, react_1.useContext)(GameContext_1.GameContext);
    const [, drop] = (0, react_dnd_1.useDrop)({
        accept: ['letter'],
        drop: (letter, monitor) => {
            if (monitor.didDrop()) {
                return;
            }
            onDropLetterOutside(letter);
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    });
    return (<div ref={drop} className="game-area">
      <div className="game-top-row">
        <LetterShop_1.LetterShop />
      </div>
      <Counters_1.Counters />
      <PlayerArea_1.PlayerArea />
      <CampaignCounters_1.CampaignCounters />
    </div>);
});
//# sourceMappingURL=GameArea.js.map