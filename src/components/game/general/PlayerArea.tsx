import './styles/PlayerArea.css';

import { observer } from 'mobx-react-lite';
import { useContext } from 'react';

import { GameContext } from '../../../stores/GameContext';
import { WordBetweenSpace } from './WordBetweenSpace';
import { WordSpace } from './WordSpace';

export const PlayerArea: React.FC = observer(() => {
  const { playerWord } = useContext(GameContext)

  const highestLetterPosition = playerWord.reduce((highest, letter) => {
    return Math.max(highest, letter.position || 0)
  }, 0)
  const spacesToRender = Math.max(8, highestLetterPosition + 2)
  const spaces = [...Array(spacesToRender)]

  return (
    <div className="player-area">
      <div className="player-area-background">
        { spaces.map((space, index) => (
          <div key={index} className="player-area-background-cell">
            {index + 1}
          </div>
        ))}
      </div>
      <div className="player-area-word-area">
        { spaces.map((space, index) => (
          <div key={index} className="player-area-word-cell">
            <WordSpace spaceIndex={index}/>
            <WordBetweenSpace spaceIndex={index}/>
          </div>
        ))}
      </div>
    </div>
  )
})