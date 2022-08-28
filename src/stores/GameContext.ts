import React from 'react'

import { GameStore } from './GameStore'

export const GameContext = React.createContext<GameStore>({} as GameStore)