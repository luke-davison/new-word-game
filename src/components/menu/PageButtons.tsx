import { observer } from "mobx-react-lite";
import { FunctionComponent, useContext } from "react";
import { AppContext } from "../../stores/AppContext";
import { GameContext } from "../../stores/GameContext";
import { CalendarPopup } from "../general/CalendarPopup";

export const PageButtons: FunctionComponent = observer(() => {
  const { isShowingCalendar, isPlayingCampaignGame, toggleIsShowingCalendar, isPlayingDailyGame, returnToMenu, isPlayingTutorialGame, tutorialGameInProgress, setTutorialGame } = useContext(AppContext)
  const { target, bestWordScore } = useContext(GameContext)

  if (isPlayingCampaignGame) {
    return (
      <div className="page-buttons">
        <button onClick={returnToMenu}>Return to menu</button>
      </div>
    )
  }

  if (isPlayingTutorialGame) {
    return (
      <div className="page-buttons">
        <button onClick={returnToMenu}>Return to menu</button>
        { tutorialGameInProgress > 1 && (
          <button onClick={() => setTutorialGame(tutorialGameInProgress - 1)}>Previous</button>
        )}
        { tutorialGameInProgress < 3 && (target || 0) <= (bestWordScore || 0) && (
          <button onClick={() => setTutorialGame(tutorialGameInProgress + 1)}>Next</button>
        )}
      </div>
    )
  }

  if (isPlayingDailyGame) {
    return (
      <>
        <div className="page-buttons">
          <button onClick={returnToMenu}>Return to menu</button>
          <button onClick={toggleIsShowingCalendar}>Calendar</button>
        </div>
        {isShowingCalendar && (
          <CalendarPopup onClose={toggleIsShowingCalendar}/>
        )}
      </>
    )
  }

  return null
})