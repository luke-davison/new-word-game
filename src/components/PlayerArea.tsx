import './PlayerArea.css';

import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Draggable, DraggingStyle, Droppable, NotDraggingStyle } from 'react-beautiful-dnd';

import { GameContext } from '../stores/GameContext';
import { Letter } from './Letter';

const grid = 5

const getItemStyle = (draggableStyle: DraggingStyle | NotDraggingStyle | undefined) => ({
  // some basic styles to make the items look a bit nicer
  // userSelect: 'none',
  padding: grid * 2,
  margin: `0 ${grid}px 0 0`,

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = () => ({
  display: 'flex',
  // padding: grid,
  overflow: 'auto',
});

export const PlayerArea: React.FC = observer(() => {
  const { playerWord } = useContext(GameContext)

  return (
    <div className="player-area">
      <div className="player-area-background">
        { [...Array(8)].map((e, index) => (
          <div key={index} className="player-area-background-cell">
          </div>
        ))}
      </div>
      <Droppable droppableId="player-area" direction="horizontal">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} style={getListStyle()}>
            { playerWord.map((letter, index) => (
              <Draggable key={letter.id + "-" + index} draggableId={letter.id + "-" + index} index={index}>
                {(provided) => (
                  <div
                    className="draggable"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(provided.draggableProps.style)}
                  >
                    <Letter letter={letter}/>
                  </div>
                )}
              </Draggable>
            )) }
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
})