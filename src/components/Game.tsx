import { action, runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { DragDropContext, DragStart, DropResult } from 'react-beautiful-dnd';

import { ShopLetter } from '../models';
import { GameContext } from '../stores/GameContext';
import { GameStore } from '../stores/GameStore';
import { getSampleGame } from '../utils/getSampleGame';
import { GameArea } from './GameArea';

const remove = (list: ShopLetter[], startIndex: number) => {
  const result = Array.from(list);
  result.splice(startIndex, 1);

  return result
}

const insert = (list: ShopLetter[], letter: ShopLetter, endIndex: number) => {
  const result = Array.from(list);
  result.splice(endIndex, 0, letter);

  return result
}

const reorder = (list: ShopLetter[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const Game: React.FC = observer(() => {
  const [gameStore] = useState<GameStore>(new GameStore(getSampleGame()))

  console.log(gameStore.playerWord)

  const onDragEnd = action((result: DropResult) => {
    gameStore.draggingId = undefined

    if (!result.destination) {
      if (result.source.droppableId === "player-area") {
        gameStore.playerWord = remove(gameStore.playerWord, result.source.index)
      }
      return;
    }

    if (result.source.droppableId !== "player-area") {
      const letter: ShopLetter = {
        ...(gameStore.shopLetters.find((letter) => letter.id === result.draggableId)!),
        id: "player-" + (gameStore.letterCount++)
      }

      const playerWord = insert(
        gameStore.playerWord,
        letter,
        result.destination.index
      );
        
      gameStore.playerWord = playerWord
    } else {
      const playerWord = reorder(
        gameStore.playerWord,
        result.source.index,
        result.destination.index
      );
        
      gameStore.playerWord = playerWord
    }
    
  })

  const onDragStart = action((dragStart: DragStart) => {
    gameStore.draggingId = dragStart.draggableId
  })

  return (
    <GameContext.Provider value={gameStore}>
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <GameArea/>
      </DragDropContext>
    </GameContext.Provider>
  )
})