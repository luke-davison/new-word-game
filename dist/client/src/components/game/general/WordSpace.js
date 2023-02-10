"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordSpace = void 0;
require("./styles/WordSpace.css");
const mobx_react_lite_1 = require("mobx-react-lite");
const react_1 = require("react");
const react_dnd_1 = require("react-dnd");
const GameContext_1 = require("../../../stores/GameContext");
const DraggableLetter_1 = require("./DraggableLetter");
const WordSpacePoints_1 = require("./WordSpacePoints");
exports.WordSpace = (0, mobx_react_lite_1.observer)(({ spaceIndex }) => {
    const { playerWord, onDropLetter, onQuickRemoveLetter } = (0, react_1.useContext)(GameContext_1.GameContext);
    const letter = playerWord.find(letter => letter.position === spaceIndex);
    const [{ isOver }, drop] = (0, react_dnd_1.useDrop)({
        accept: ['letter'],
        drop: (storeLetter) => onDropLetter(storeLetter, spaceIndex),
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    });
    const onDoubleClick = () => {
        if (letter) {
            onQuickRemoveLetter(letter);
        }
    };
    return (<div ref={drop} className="player-area-space" onDoubleClick={onDoubleClick}>
      {letter && (<DraggableLetter_1.DraggableLetter letter={letter}/>)}
      {isOver && (<div className="player-space-drop-overlay"/>)}
      <WordSpacePoints_1.WordSpacePoints spaceIndex={spaceIndex}/>
    </div>);
});
//# sourceMappingURL=WordSpace.js.map