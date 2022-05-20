import './styles/Money.css';

import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';

import { GameContext } from '../../../stores/GameContext';

export const Money: React.FC = observer(() => {
  const { money } = useContext(GameContext)

  return (
      <div className={`money-area ${money < 0 ? " overdrawn" : ""}`}>
        <span className="dollar-sign">$</span>
        <span>{money}</span>
      </div>
  )
})