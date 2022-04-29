import './LetterPopup.css';

import React, { useEffect } from 'react';

import { LetterInstance } from '../../shared/models/LetterInstance';
import { Alphabet } from './Alphabet';

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
  }, [])

  const onSelect = (character: string) => {
    letter.setWildLetter(character)
    onClose()
  }

  return (
    <div className="letter-popup">
      <Alphabet onSelect={onSelect}/>
    </div>
  )
}