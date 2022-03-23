import './LetterPopup.css';

import { runInAction } from 'mobx';
import React from 'react';

import { ShopLetter } from '../models';
import { Alphabet } from './Alphabet';

interface LetterPopupProps {
  letter: ShopLetter
  onClose: () => void
}

export const LetterPopup: React.FC<LetterPopupProps> = ({ letter, onClose }) => {
  if (!letter.isWild) {
    return null
  }

  const onSelect = (character: string) => {
    console.log('on select')
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