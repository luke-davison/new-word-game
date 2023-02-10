import './styles/WordPoints.css'

import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'

import { AppContext } from '../../../stores/AppContext'
import { GameContext } from '../../../stores/GameContext'

export const WordPoints: React.FC = observer(() => {
  const { isPlayingDailyGame, isPlayingPreviousGame } = useContext(AppContext)
  const { target, secretTarget, wordPoints, bestWord, bestWordScore, isValidWord, reinstateBestWord } = useContext(GameContext)

  const isShowTargets = !!isPlayingDailyGame || !!isPlayingPreviousGame
  const isSecretTargetMet = isShowTargets && wordPoints >= (secretTarget || 0) && (bestWordScore || 0) >= (secretTarget || 0) && isValidWord

  return (
    <div className="word-points-area">
      <div className={`word-points ${isSecretTargetMet ? 'secret-target-met' : ''}`}>
        <span>{wordPoints}</span>
      </div>
      {isShowTargets && (
        <div className="word-points-targets">
          <div className="word-target">
            {'Target: ' + target}
          </div>
          { (bestWordScore || 0) >= (secretTarget || 0) && (
            <div className="secret-target">
              {'Secret Target: ' + secretTarget}
            </div>
          ) }
          {bestWord && (
            <div className="best-word">
              <span>{'Best: '}</span>
              { wordPoints < (bestWordScore || 0) ? (
                <button className="link" onClick={reinstateBestWord}>{`${bestWord} (${bestWordScore})`}</button>
              ) : (
                <span>{`${bestWord} (${bestWordScore})`}</span>
              )} 
            </div>
          )}
        </div>
      )}
    </div>
  )
})