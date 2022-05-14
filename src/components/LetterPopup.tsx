import './LetterPopup.css';

import React, { useEffect } from 'react';

import { LetterInstance } from '../models/LetterInstance';
import { Alphabet } from './Alphabet';
import { AbilityImage } from './AbilityImage';
import { getAbilityText } from '../utils/getAbilityText';
import { Abilities } from '../shared';

interface LetterPopupProps {
  letter: LetterInstance
  onClose: () => void
}

export const LetterPopup: React.FC<LetterPopupProps> = ({ letter, onClose }) => {
  useEffect(() => {
    const listener = () => {
      onClose()
    }

    document.body.addEventListener('click', listener);
    return () => document.body.removeEventListener('click', listener)
  }, [onClose])

  const onSelect = (character: string) => {
    letter.setWildLetter(character)
    onClose()
  }

  return (
    <div className="letter-popup">
      {letter.ability && (
        <div className="letter-popup-ability-image">
          <AbilityImage ability={letter.ability}/>
        </div>
      )}
      <div className="letter-popup-ability-text">
        {letter.ability ? getAbilityText(letter.ability) : "This letter has no ability"}
      </div>
      {letter.position && letter.ability === Abilities.Wild && (
        <Alphabet onSelect={onSelect}/>
      )}
    </div>
  )
}