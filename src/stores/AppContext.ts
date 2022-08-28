import React from 'react'

import { AppStore } from './AppStore'

export const AppContext = React.createContext<AppStore>({} as AppStore)