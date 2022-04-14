import './WordPoints.css';

import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';

import { AppContext } from '../stores/AppContext';
import { GameContext } from '../stores/GameContext';

export const WordPoints: React.FC = observer(() => {
  const { isPlayingCampaignGame } = useContext(AppContext)
  const { target, secretTarget, wordPoints, bestWord, bestWordScore, isValidWord } = useContext(GameContext)

  const isSecretTargetMet = !isPlayingCampaignGame && wordPoints >= secretTarget && (bestWordScore || 0) >= secretTarget && isValidWord

  return (
      <div className="word-points-area">
        <div className={`word-points ${isSecretTargetMet ? "secret-target-met" : ""}`}>
          <span>{wordPoints}</span>
        </div>
        {!isPlayingCampaignGame && (
          <>
            <div className="word-target">
              {`Target: ` + target}
            </div>
            { (bestWordScore || 0) >= secretTarget && (
              <div className="secret-target">
                {`Secret Target: ` + secretTarget}
              </div>
            ) }
            {bestWord && (
              <div className="best-word">
                {`Best: ${bestWord} (${bestWordScore})`}
              </div>
            )}
          </>
        )}
      </div>
  )
})