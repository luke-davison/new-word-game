"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerArea = void 0;
require("./styles/PlayerArea.css");
const mobx_react_lite_1 = require("mobx-react-lite");
const react_1 = require("react");
const GameContext_1 = require("../../../stores/GameContext");
const WordBetweenSpace_1 = require("./WordBetweenSpace");
const WordSpace_1 = require("./WordSpace");
exports.PlayerArea = (0, mobx_react_lite_1.observer)(() => {
    const { playerWord } = (0, react_1.useContext)(GameContext_1.GameContext);
    const highestLetterPosition = playerWord.reduce((highest, letter) => {
        return Math.max(highest, letter.position || 0);
    }, 0);
    const spacesToRender = Math.max(8, highestLetterPosition + 2);
    const spaces = [...Array(spacesToRender)];
    return (<div className="player-area">
      <div className="player-area-background">
        {spaces.map((space, index) => (<div key={index} id={'player-area-cell-' + (index + 1)} className="player-area-background-cell">
            {index + 1}
          </div>))}
      </div>
      <div id="player-area-word-area">
        {spaces.map((space, index) => (<div key={index} className="player-area-word-cell">
            <WordSpace_1.WordSpace spaceIndex={index}/>
            <WordBetweenSpace_1.WordBetweenSpace spaceIndex={index}/>
          </div>))}
      </div>
    </div>);
});
//# sourceMappingURL=PlayerArea.js.map