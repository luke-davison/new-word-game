import './styles/Letter.css';

import { observer } from 'mobx-react-lite';
import { useContext, useState } from 'react';

import { LetterInstance } from '../../../models/LetterInstance';
import { getAbilityIsActive } from '../../../shared/utils/abilities/getAbilityIsActive';
import { AppContext } from '../../../stores/AppContext';
import { GameContext } from '../../../stores/GameContext';
import { LetterPopup } from './LetterPopup';
import { AbilityImage } from './AbilityImage';

export const Letter: React.FC<{ letter: LetterInstance }> = observer(({ letter }) => {
  const { player } = useContext(AppContext)
  const { playerWordFull } = useContext(GameContext)
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const isAbilityActive = letter.position === undefined || getAbilityIsActive(playerWordFull, letter.position, player)

  const onClick = () => {
    setIsPopupOpen(!isPopupOpen)
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
              <AbilityImage ability={letter.ability}/>
              {letter.abilityPoints !== undefined && (
                <div className="letter-ability-points">
                  {letter.abilityPoints}
                </div>
              )}
        </div>
          )}
      </div>
      {isPopupOpen && <LetterPopup letter={letter} onClose={ () => setIsPopupOpen(false)}/>}
    </div>
  )
})