"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordSpacePoints = void 0;
require("./styles/WordSpacePoints.css");
const mobx_react_lite_1 = require("mobx-react-lite");
const react_1 = require("react");
const getAbilityIsActive_1 = require("../../../shared/utils/abilities/getAbilityIsActive");
const getAbilityPoints_1 = require("../../../shared/utils/abilities/getAbilityPoints");
const AppContext_1 = require("../../../stores/AppContext");
const GameContext_1 = require("../../../stores/GameContext");
exports.WordSpacePoints = (0, mobx_react_lite_1.observer)(({ spaceIndex }) => {
    const { player } = (0, react_1.useContext)(AppContext_1.AppContext);
    const { playerWord, playerWordFull } = (0, react_1.useContext)(GameContext_1.GameContext);
    const letter = playerWord.find(letter => letter.position === spaceIndex);
    if (letter) {
        let points = letter.points;
        if (!letter.isWild && (0, getAbilityIsActive_1.getAbilityIsActive)(playerWordFull, spaceIndex, player)) {
            points += (0, getAbilityPoints_1.getAbilityPoints)(playerWordFull, spaceIndex, player);
        }
        return (<div className="word-space-points">
        {spaceIndex !== 0 && <span>+</span>}
        <span>{points}</span>
      </div>);
    }
    return <div />;
});
//# sourceMappingURL=WordSpacePoints.js.map