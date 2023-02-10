"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menu = void 0;
require("./styles/Menu.css");
const mobx_react_lite_1 = require("mobx-react-lite");
const react_1 = require("react");
const AppContext_1 = require("../../stores/AppContext");
const Game_1 = require("../game/general/Game");
const MenuWrapper_1 = require("./MenuWrapper");
const PreviousGamesMenu_1 = require("./PreviousGamesMenu");
exports.Menu = (0, mobx_react_lite_1.observer)(() => {
    const { startCampaignGame, isPlayingCampaignGame, isPlayingDailyGame, startDailyGame, startTutorialGame, isPlayingTutorialGame, gameId, openPreviousGamesMenu, isPreviousGamesMenuOpen, isPlayingPreviousGame } = (0, react_1.useContext)(AppContext_1.AppContext);
    if (isPreviousGamesMenuOpen) {
        return (<PreviousGamesMenu_1.PreviousGamesMenu />);
    }
    if (isPlayingCampaignGame || isPlayingTutorialGame || isPlayingDailyGame || isPlayingPreviousGame) {
        return (<Game_1.Game key={gameId}/>);
    }
    return (<MenuWrapper_1.MenuWrapper>
      <div className="game-description">
        <div>The daily game of buying and arranging letters.</div>
        <div>Just like the lettersmiths of old.</div>
      </div>
      <div className="menu-buttons">
        <div>
          <button onClick={startDailyGame}>Daily game</button>
        </div>
        <div>
          <button onClick={startCampaignGame}>Campaign game</button>
        </div>
        <div>
          <button onClick={startTutorialGame}>Tutorial</button>
        </div>
        <div>
          <button onClick={openPreviousGamesMenu}>Previous games</button>
        </div>
      </div>
    </MenuWrapper_1.MenuWrapper>);
});
//# sourceMappingURL=Menu.js.map