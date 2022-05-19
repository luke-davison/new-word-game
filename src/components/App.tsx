import './App.css';

import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';

import { AppContext } from '../stores/AppContext';
import { AppStore } from '../stores/AppStore';
import { Menu } from './menu/Menu';

const App: React.FC = observer(() => {
  const [appStore] = useState<AppStore>(new AppStore())

  useEffect(() => {
    appStore.loadAppData()
}, [appStore])

  return (
    <AppContext.Provider value={appStore}>
      <div className="App">
        <Menu/>
      </div>
    </AppContext.Provider>
  );
})

export default App;
