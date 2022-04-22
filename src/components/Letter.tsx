import './Letter.css';

import { observer } from 'mobx-react-lite';
import { useContext, useState } from 'react';

import { LetterInstance } from '../../common/models/LetterInstance';
import { GameContext } from '../stores/GameContext';
import { LetterPopup } from './LetterPopup';

export const Letter: React.FC<{ letter: LetterInstance }> = observer(({ letter }) => {
  const { playerWord } = useContext(GameContext)
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const isAbilityActive = letter.position === undefined || letter.ability?.getIsActive(playerWord, letter.position)

  const onClick = () => {
    if (letter.position !== undefined) {
      setIsPopupOpen(!isPopupOpen)
    }
  }

  return (
    <div className="letter-container-outer">
      <div className={"letter-container letter-color-" + letter.color} onClick={onClick}>
        <div className="letter-character">
          { letter.char }
        </div>
        <div className="letter-points">
          { letter.points }
        </div>
          { letter.ability && (
            <div className={`letter-ability${ isAbilityActive ? " is-active" : ""}` }>
              <img src={letter.ability.image}/>
              {letter.ability.points !== undefined && (
                <div className="letter-ability-points">
                  {letter.ability.points}
                </div>
              )}
              {letter.ability.multiplier !== undefined && (
                <div className="letter-ability-multiplier">
                  {'x' + letter.ability.multiplier}
                </div>
              )}
        </div>
          )}
      </div>
      {isPopupOpen && letter.isWild && <LetterPopup letter={letter} onClose={ () => setIsPopupOpen(false)}/>}
    </div>
  )
})