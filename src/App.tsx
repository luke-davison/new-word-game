import './App.css';

import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';

import { Menu } from './components/Menu';
import { AppContext } from './stores/AppContext';
import { AppStore } from './stores/AppStore';

const App: React.FC = observer(() => {
  const [appStore] = useState<AppStore>(new AppStore())

  return (
    <AppContext.Provider value={appStore}>
      <div className="App">
        <Menu/>
      </div>
    </AppContext.Provider>
  );
})

export default App;
