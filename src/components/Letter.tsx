import './Letter.css';

import { observer } from 'mobx-react-lite';
import { useContext, useState } from 'react';

import { LetterInstance } from '../models/LetterInstance';
import { getAbilityIsActive } from '../shared/utils/abilities/getAbilityIsActive';
import { AppContext } from '../stores/AppContext';
import { GameContext } from '../stores/GameContext';
import { getAbilityImage } from '../utils/getAbilityImage';
import { LetterPopup } from './LetterPopup';

export const Letter: React.FC<{ letter: LetterInstance }> = observer(({ letter }) => {
  const { player } = useContext(AppContext)
  const { playerWord } = useContext(GameContext)
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const isAbilityActive = letter.position === undefined || getAbilityIsActive(playerWord, letter.position, player)

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
              <img src={getAbilityImage(letter.ability)}/>
              {letter.abilityPoints !== undefined && (
                <div className="letter-ability-points">
                  {letter.abilityPoints}
                </div>
              )}
        </div>
          )}
      </div>
      {isPopupOpen && letter.isWild && <LetterPopup letter={letter} onClose={ () => setIsPopupOpen(false)}/>}
    </div>
  )
})