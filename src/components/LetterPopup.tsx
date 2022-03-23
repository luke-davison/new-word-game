import './LetterPopup.css';

import { runInAction } from 'mobx';
import React, { useEffect } from 'react';

import { ShopLetter } from '../models';
import { Alphabet } from './Alphabet';

interface LetterPopupProps {
  letter: ShopLetter
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
    runInAction(() => {
      letter.letter = character
    })
    onClose()
  }

  return (
    <div className="letter-popup">
      <Alphabet onSelect={onSelect}/>
    </div>
  )
}