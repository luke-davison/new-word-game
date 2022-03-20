import React from 'react';

import { AppStore } from './AppStore';

export const GameContext = React.createContext<AppStore>({} as AppStore);