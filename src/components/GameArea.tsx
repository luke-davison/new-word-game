import { observer } from 'mobx-react-lite';
import React from 'react';

import { LetterShop } from './LetterShop';
import { PlayerArea } from './PlayerArea';

export const GameArea: React.FC = observer(() => {
  return (
    <div className="game-area">
      <LetterShop/>
      <PlayerArea/>
    </div>
  )
})