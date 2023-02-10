import './styles/LetterPopup.css'

import React from 'react'

import { LetterInstance } from '../../../models/LetterInstance'
import { Abilities } from '../../../shared'
import { getAbilityText } from '../../../utils/getAbilityText'
import { AbilityImage } from './AbilityImage'
import { Alphabet } from './Alphabet'
import { Popup, PopupProps } from '../../general/Popup'

interface LetterPopupProps extends PopupProps {
  letter: LetterInstance
}

export const LetterPopup: React.FC<LetterPopupProps> = ({ letter, ...props }) => {
  const onSelect = (character: string) => {
    letter.setWildLetter(character)
    props.onClose()
  }

  return (
    <Popup {...props}>
      {letter.ability && (
        <div className="letter-popup-ability-image">
          <AbilityImage ability={letter.ability}/>
        </div>
      )}
      <div className="letter-popup-ability-text">
        {letter.ability ? getAbilityText(letter.ability) : 'This letter has no ability'}
      </div>
      {letter.position !== undefined && letter.ability === Abilities.Wild && (
        <Alphabet onSelect={onSelect}/>
      )}
    </Popup>
  )
}