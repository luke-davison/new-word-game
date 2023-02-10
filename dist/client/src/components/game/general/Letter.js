"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Letter = void 0;
require("./styles/Letter.css");
const mobx_react_lite_1 = require("mobx-react-lite");
const react_1 = require("react");
const getAbilityIsActive_1 = require("../../../shared/utils/abilities/getAbilityIsActive");
const AppContext_1 = require("../../../stores/AppContext");
const GameContext_1 = require("../../../stores/GameContext");
const AbilityImage_1 = require("./AbilityImage");
const LetterPopup_1 = require("./LetterPopup");
exports.Letter = (0, mobx_react_lite_1.observer)(({ disabled, label, letter }) => {
    const { player } = (0, react_1.useContext)(AppContext_1.AppContext);
    const { playerWordFull } = (0, react_1.useContext)(GameContext_1.GameContext);
    const [isPopupOpen, setIsPopupOpen] = (0, react_1.useState)(false);
    const isAbilityActive = letter.position === undefined || (0, getAbilityIsActive_1.getAbilityIsActive)(playerWordFull, letter.position, player);
    const onClick = () => {
        if (!disabled) {
            setIsPopupOpen(!isPopupOpen);
        }
    };
    let classNames = 'letter-container';
    classNames += ' letter-color-' + letter.color;
    if (disabled) {
        classNames += ' disabled';
    }
    const elementId = 'letter-' + letter.letterId;
    return (<div id={elementId} className="letter-container-outer">
      <div className={classNames} onClick={onClick}>
        <div className="letter-character">
          {letter.char}
        </div>
        {letter.points > 0 && (<div className="letter-points">
            {letter.points}
          </div>)}
        {letter.ability && (<div className={`letter-ability${isAbilityActive ? ' is-active' : ''}`}>
            <AbilityImage_1.AbilityImage ability={letter.ability}/>
            {letter.abilityPoints !== undefined && (<div className="letter-ability-points">
                {letter.abilityPoints}
              </div>)}
          </div>)}
        {label && (<div className="letter-label">
            {label}
          </div>)}
      </div>
      {isPopupOpen && <LetterPopup_1.LetterPopup letter={letter} onClose={() => setIsPopupOpen(false)} elementId={elementId}/>}
    </div>);
});
//# sourceMappingURL=Letter.js.map