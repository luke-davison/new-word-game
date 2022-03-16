import './PlayerArea.css';

import { observer } from 'mobx-react-lite';
import { useContext } from 'react';

import { GameContext } from '../stores/GameContext';
import { WordSpace } from './WordSpace';

export const PlayerArea: React.FC = observer(() => {
  const { playerWord } = useContext(GameContext)

  const highestLetterPosition = playerWord.reduce((highest, letter) => {
    return Math.max(highest, letter.position || 0)
  }, 0)
  const spacesToRender = Math.max(8, highestLetterPosition + 1)
  const spaces = [...Array(spacesToRender)]

  return (
    <div className="player-area">
      <div className="player-area-background">
        { spaces.map((space, index) => (
          <div key={index} className="player-area-background-cell">
          </div>
        ))}
      </div>
      <div className="player-area-word-area">
        { spaces.map((space, index) => (
          <div key={index} className="player-area-word-cell">
            <WordSpace key={index} spaceIndex={index}/>
          </div>
        ))}
      </div>
    </div>
  )
})