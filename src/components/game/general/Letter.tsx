import './styles/Letter.css'

import { observer } from 'mobx-react-lite'
import { useContext, useState } from 'react'

import { LetterInstance } from '../../../models/LetterInstance'
import { getAbilityIsActive } from '../../../shared/utils/abilities/getAbilityIsActive'
import { AppContext } from '../../../stores/AppContext'
import { GameContext } from '../../../stores/GameContext'
import { AbilityImage } from './AbilityImage'
import { LetterPopup } from './LetterPopup'

export interface LetterProps {
  letter: LetterInstance;
  disabled?: boolean;
  label?: string;
}

export const Letter: React.FC<LetterProps> = observer(({ disabled, label, letter }) => {
  const { player } = useContext(AppContext)
  const { playerWordFull } = useContext(GameContext)
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const isAbilityActive = letter.position === undefined || getAbilityIsActive(playerWordFull, letter.position, player)

  const onClick = () => {
    if (!disabled) {
      setIsPopupOpen(!isPopupOpen)
    }
  }

  let classNames = "letter-container"
  classNames += " letter-color-" + letter.color
  if (disabled) {
    classNames += " disabled"
  }

  return (
    <div className="letter-container-outer">
      <div className={classNames} onClick={onClick}>
        <div className="letter-character">
          { letter.char }
        </div>
        {letter.points > 0 && (
          <div className="letter-points">
            { letter.points }
          </div>
        )}
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
        {label && (
          <div className="letter-label">
            {label}
          </div>
        )}
      </div>
      {isPopupOpen && <LetterPopup letter={letter} onClose={ () => setIsPopupOpen(false)}/>}
    </div>
  )
})