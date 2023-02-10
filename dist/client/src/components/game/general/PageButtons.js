"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageButtons = void 0;
require("./styles/PageButtons.css");
const mobx_react_lite_1 = require("mobx-react-lite");
const react_1 = require("react");
const AppContext_1 = require("../../../stores/AppContext");
const GameContext_1 = require("../../../stores/GameContext");
const TutorialMessages_1 = require("../tutorial/TutorialMessages");
exports.PageButtons = (0, mobx_react_lite_1.observer)(() => {
    const { isPlayingCampaignGame, returnToMenu, isPlayingTutorialGame, tutorialGameInProgress, setTutorialGame } = (0, react_1.useContext)(AppContext_1.AppContext);
    const { onClear, target, bestWordScore, isValidWord, playerWord } = (0, react_1.useContext)(GameContext_1.GameContext);
    const tutorialButtons = isPlayingTutorialGame ? (<>
      {tutorialGameInProgress > 1 && (<button onClick={() => setTutorialGame(tutorialGameInProgress - 1)}>Previous</button>)}
      {tutorialGameInProgress < 3 && (target || 0) <= (bestWordScore || 0) && (<button onClick={() => setTutorialGame(tutorialGameInProgress + 1)}>Next</button>)}
    </>) : undefined;
    const tutorialMessages = isPlayingTutorialGame ? (<TutorialMessages_1.TutorialMessages />) : undefined;
    const submitButton = isPlayingCampaignGame ? (<button className="submit-button" disabled={!isValidWord}>Submit</button>) : undefined;
    return (<>
      <div className="page-buttons">
        <button className="return-to-menu-button" onClick={returnToMenu} title="Return to menu"/>
        <div className="page-buttons-right">
          <button className="clear-button" onClick={onClear} disabled={playerWord.length === 0}>Clear</button>
          {tutorialButtons}
          {submitButton}
        </div>
      </div>
      {tutorialMessages}
    </>);
});
//# sourceMappingURL=PageButtons.js.map