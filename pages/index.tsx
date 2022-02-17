import type { InferGetServerSidePropsType } from 'next';
import React, { useEffect, useMemo } from 'react';
import Layout from '../components/Layout';
import PlayLists from '../components/Playlists';
import { Data } from '../types/Playlist';
import { DragDropContext, Droppable, Draggable, DropResult, resetServerContext } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/reducers/rootReducer';
import * as t from '../redux/types';

const Home: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ data }) => {
  const dispatch = useDispatch();
  const myPlayList: Data[] = useSelector((state: RootState) => state.playlist.MyPlaylist);
  const myPlayListIds = myPlayList && myPlayList.map((val) => val.id);
  const playlist = useMemo(() => data.filter((val) => !myPlayListIds.includes(val.id)), [data, myPlayListIds])

  useEffect(() => {
    dispatch({ type: t.INITIALIZE_PLAYLIST, name: 'Playlist', payload: { playLists: playlist } })
    dispatch({ type: t.INITIALIZE_PLAYLIST, name: 'MyPlaylist', payload: { playLists: myPlayList } })
  }, [data, dispatch, myPlayList, playlist])

  const handleOnDragEnd = (result: DropResult) => {
    dispatch({ type: t.MOVE_PLAYLIST, payload: result })
  }

  return (
    <Layout>
      <DragDropContext onDragEnd={(result, provided) => {
        handleOnDragEnd(result)
      }}>
        <PlayLists label="Playlist" list={playlist} />
        <PlayLists label="My Playlist" list={myPlayList} />
      </DragDropContext>
    </Layout>
  )
}

export async function getServerSideProps() {
  resetServerContext();
  try {
    const dataRaw = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/featuredPlaylists`)
    const data: Data[] = await dataRaw.json();
    return {
      props: {
        data
      }
    }
  } catch (err) {
    return {
      props: {
        data: []
      }
    }
  }
}

export default Home
