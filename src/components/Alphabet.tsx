import './Alphabet.css';

import React, { KeyboardEvent, useEffect } from 'react';

const alphabet = ["abcdefghi", "jklmnopqr", "stuvwxyz"]

interface AlphabetProps {
  onSelect: (letter: string) => void
}

export const Alphabet: React.FC<AlphabetProps> = ({ onSelect }) => {

  useEffect(() => {
    const listener = (event: globalThis.KeyboardEvent) => {
      onSelect(event.key)
    }

    document.body.addEventListener('keydown', listener);
    return () => document.body.removeEventListener('keydown', listener)
  }, [])

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    console.log(e)
    onSelect(e.key)
  }

  return (
    <div className="alphabet-container" onKeyDown={onKeyDown} tabIndex={0}>
      {alphabet.map((row, index) => (
        <div key={index} className="alphabet-row">
          {row.split("").map((letter, index) => (
            <div key={index} className="alphabet-letter" onClick={() => onSelect(letter)}>
              {letter}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}