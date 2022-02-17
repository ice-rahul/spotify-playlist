import React from 'react'
import { PlayListsProps } from '../../types/Playlist'
import PlayListItem from '../PlaylistItem'
import { Droppable, Draggable } from 'react-beautiful-dnd';

const PlayLists: React.FC<PlayListsProps> = ({ label = 'Playlist', list = [] }) => {

  return (
    <div className='flex flex-col border rounded text-gray-700 border-gray-700 flex-1 w-3/4 max-w-lg px-4 py-2'>
      <div className='font-semibold text-xl border-b border-gray-800 mb-2'>{label}</div>
      <Droppable droppableId={`playlistItems-${label.split(' ').join('-')}`} type="Playlist">
        {(provided) => (
          <ul ref={provided.innerRef} {...provided.droppableProps} className="flex-1">
            {
              list.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <PlayListItem item={item} />
                    </li>
                  )}
                </Draggable>
              ))
            }
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  )
}

export default PlayLists;