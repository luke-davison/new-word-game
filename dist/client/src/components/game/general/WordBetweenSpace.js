"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordBetweenSpace = void 0;
require("./styles/WordBetweenSpace.css");
const mobx_react_lite_1 = require("mobx-react-lite");
const react_1 = require("react");
const react_dnd_1 = require("react-dnd");
const GameContext_1 = require("../../../stores/GameContext");
exports.WordBetweenSpace = (0, mobx_react_lite_1.observer)(({ spaceIndex }) => {
    const { playerWord, onDropLetterBetween } = (0, react_1.useContext)(GameContext_1.GameContext);
    const [{ isOver }, drop] = (0, react_dnd_1.useDrop)({
        accept: ['letter'],
        drop: (storeLetter) => onDropLetterBetween(storeLetter, spaceIndex),
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    });
    const isBetweenLetters = playerWord.some(letter => letter.position === spaceIndex)
        && (spaceIndex === 0 || playerWord.some(letter => letter.position === spaceIndex - 1));
    if (!isBetweenLetters) {
        return null;
    }
    return (<div ref={drop} className="player-area-between-space">
      {isOver && (<div className="player-between-drop-overlay"/>)}
    </div>);
});
//# sourceMappingURL=WordBetweenSpace.js.map