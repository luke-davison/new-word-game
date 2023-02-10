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
exports.WordPoints = void 0;
require("./styles/WordPoints.css");
const mobx_react_lite_1 = require("mobx-react-lite");
const react_1 = __importStar(require("react"));
const AppContext_1 = require("../../../stores/AppContext");
const GameContext_1 = require("../../../stores/GameContext");
exports.WordPoints = (0, mobx_react_lite_1.observer)(() => {
    const { isPlayingDailyGame, isPlayingPreviousGame } = (0, react_1.useContext)(AppContext_1.AppContext);
    const { target, secretTarget, wordPoints, bestWord, bestWordScore, isValidWord, reinstateBestWord } = (0, react_1.useContext)(GameContext_1.GameContext);
    const isShowTargets = !!isPlayingDailyGame || !!isPlayingPreviousGame;
    const isSecretTargetMet = isShowTargets && wordPoints >= (secretTarget || 0) && (bestWordScore || 0) >= (secretTarget || 0) && isValidWord;
    return (<div className="word-points-area">
      <div className={`word-points ${isSecretTargetMet ? 'secret-target-met' : ''}`}>
        <span>{wordPoints}</span>
      </div>
      {isShowTargets && (<div className="word-points-targets">
          <div className="word-target">
            {'Target: ' + target}
          </div>
          {(bestWordScore || 0) >= (secretTarget || 0) && (<div className="secret-target">
              {'Secret Target: ' + secretTarget}
            </div>)}
          {bestWord && (<div className="best-word">
              <span>{'Best: '}</span>
              {wordPoints < (bestWordScore || 0) ? (<button className="link" onClick={reinstateBestWord}>{`${bestWord} (${bestWordScore})`}</button>) : (<span>{`${bestWord} (${bestWordScore})`}</span>)} 
            </div>)}
        </div>)}
    </div>);
});
//# sourceMappingURL=WordPoints.js.map