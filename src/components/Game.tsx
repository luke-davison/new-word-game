import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { ShopLetter } from '../models';
import { GameContext } from '../stores/GameContext';
import { GameStore } from '../stores/GameStore';
import { getSampleGame } from '../utils/getSampleGame';
import { GameArea } from './GameArea';

// a little function to help us with reordering the result
const reorder = (list: ShopLetter[], startIndex: number, endIndex : number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const Game: React.FC = observer(() => {
  const [gameStore] = useState<GameStore>(new GameStore(getSampleGame()))

  console.log(gameStore.playerWord)

  const onDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    
    const playerWord = reorder(
      gameStore.playerWord,
      result.source.index,
      result.destination.index
      );
      
      console.log("reordered", playerWord)
    runInAction(() => {
      gameStore.playerWord = playerWord
    })
  }

  return (
    <GameContext.Provider value={gameStore}>
      <DragDropContext onDragEnd={onDragEnd}>
        <GameArea/>
      </DragDropContext>
    </GameContext.Provider>
  )
})