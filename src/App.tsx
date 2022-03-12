import './App.css';

import { observer } from 'mobx-react-lite';
import React from 'react';

import { Game } from './components/Game';

const App: React.FC = observer(() => {
  return (
    <div className="App">
      <Game/>
    </div>
  );
})

export default App;
