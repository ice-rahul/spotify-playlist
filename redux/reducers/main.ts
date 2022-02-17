import * as t from '../types';
import { StateProps } from '../../types/Playlist';

const getPlaylist = (playListId: string | undefined) => {
  const playListName = playListId?.split('-').splice(1)
  return playListName?.join('')
}

const main = (state: StateProps = {}, action: any) => {
  switch (action.type) {
    case t.MOVE_PLAYLIST: {
      if (!action.payload.destination) return state;

      const sourceId = action.payload.source?.droppableId;
      const destinationId = action.payload.destination.droppableId;
      const sourcePlaylist = getPlaylist(sourceId);
      const destinationPlayList = getPlaylist(destinationId)
      const items = state[sourcePlaylist || 0];
      const [reorderedItem] = items.splice(action.payload.source?.index || 0, 1);
      if (sourcePlaylist === destinationPlayList) {
        items.splice(action.payload.destination.index, 0, reorderedItem);
      } else {
        const destinationItems = state[destinationPlayList || 0];
        destinationItems.splice(0, 0, reorderedItem)
      }
      return { ...state }
    }
    case t.INITIALIZE_PLAYLIST: {
      const playList = action.name || ''
      const playListItem = action.payload.playLists || []
      state[playList] = playListItem
      return { ...state }
    }
    default: {
      return state;
    }
  }
}

export default main;