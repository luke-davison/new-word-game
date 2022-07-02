import "./styles/PageButtons.css"

import { observer } from 'mobx-react-lite';
import { FunctionComponent, useContext } from 'react';

import { AppContext } from '../../../stores/AppContext';
import { GameContext } from '../../../stores/GameContext';

export const PageButtons: FunctionComponent = observer(() => {
  const { isPlayingCampaignGame, returnToMenu, isPlayingTutorialGame, tutorialGameInProgress, setTutorialGame } = useContext(AppContext)
  const { onClear, target, bestWordScore, submitWord, isValidWord } = useContext(GameContext)

  const tutorialButtons = isPlayingTutorialGame ? (
    <>
      { tutorialGameInProgress > 1 && (
          <button onClick={() => setTutorialGame(tutorialGameInProgress - 1)}>Previous</button>
        )}
        { tutorialGameInProgress < 3 && (target || 0) <= (bestWordScore || 0) && (
          <button onClick={() => setTutorialGame(tutorialGameInProgress + 1)}>Next</button>
        )}
    </>
  ) : undefined

  const submitButton = isPlayingCampaignGame ? (
    <button className="submit-button" onClick={submitWord} disabled={!isValidWord}>Submit</button>
  ) : undefined

  return (
    <div className="page-buttons">
      <button onClick={returnToMenu} title="Return to menu">{"<"}</button>
      <div className="page-buttons-right">
      <button className="clear-button" onClick={onClear}>Clear</button>
        {tutorialButtons}
        {submitButton}
      </div>
    </div>
  )
})