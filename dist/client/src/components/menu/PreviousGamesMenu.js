"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreviousGamesMenu = void 0;
require("./styles/PreviousGamesMenu.css");
const mobx_react_lite_1 = require("mobx-react-lite");
const react_1 = require("react");
const shared_1 = require("../../shared");
const AppContext_1 = require("../../stores/AppContext");
const Calendar_1 = require("../general/Calendar");
const MenuWrapper_1 = require("./MenuWrapper");
const PreviousGamesMenuKey_1 = require("./PreviousGamesMenuKey");
exports.PreviousGamesMenu = (0, mobx_react_lite_1.observer)(() => {
    const { dateString, startPreviousGame, returnToMenu, startDailyGame, cachedGameDates = [], cachedGames, cachedScores, loadCachedGameData } = (0, react_1.useContext)(AppContext_1.AppContext);
    (0, react_1.useEffect)(() => {
        loadCachedGameData();
    }, [loadCachedGameData]);
    const earliestGame = cachedGameDates.length > 0 ? cachedGames.get(cachedGameDates[0]) : undefined;
    const latestGame = cachedGameDates.length > 0 ? cachedGames.get(cachedGameDates[cachedGameDates.length - 1]) : undefined;
    const renderDate = (date) => {
        const gameDateString = (0, shared_1.getDateString)(date);
        const game = cachedGames.get(gameDateString);
        if (game) {
            const onClick = () => {
                if (game.date === dateString) {
                    startDailyGame();
                }
                else {
                    startPreviousGame(game);
                }
            };
            let className = 'game-link';
            if (game.date === dateString) {
                className += ' current-game';
            }
            else {
                className += ' previous-game';
            }
            const points = cachedScores.get(gameDateString) || 0;
            if (points >= game.secretTarget) {
                className += ' met-secret-target';
            }
            else if (points >= game.target) {
                className += ' met-target';
            }
            return (<div onClick={onClick} className={className}>
          {date.getDate()}
        </div>);
        }
        return (<div>
        {date.getDate()}
      </div>);
    };
    return (<MenuWrapper_1.MenuWrapper>
      {cachedGameDates.length > 1 ? (<div>
          <Calendar_1.Calendar startDate={new Date()} minDate={earliestGame ? (0, shared_1.getDateFromString)(earliestGame.date) : new Date()} maxDate={latestGame ? (0, shared_1.getDateFromString)(latestGame.date) : new Date()} renderDate={renderDate}/>
          <PreviousGamesMenuKey_1.PreviousGamesMenuKey />
        </div>) : (<div>
          <div>
            Looks like this is your first day.
          </div>
          <div>
            Return back here in the future to view past results and revisit games that you feel like you could improve on.
          </div>
        </div>)}
      <div>
        <button onClick={returnToMenu}>Return to Menu</button>
      </div>
    </MenuWrapper_1.MenuWrapper>);
});
//# sourceMappingURL=PreviousGamesMenu.js.map