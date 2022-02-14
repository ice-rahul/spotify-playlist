import type { InferGetServerSidePropsType } from 'next';
import React, {useEffect, useMemo} from 'react';
import Layout from '../components/Layout';
import PlayLists from '../components/Playlists';
import { Data } from '../types/Playlist';
import { DragDropContext, Droppable, Draggable, DropResult, resetServerContext } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';
import * as t from '../redux/types';

const Home: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ data }) => {

  const myPlayList: Data[] = useMemo(() => [], []);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch({type: t.INITIALIZE_PLAYLIST, name: 'Playlist', payload: { playLists: data}})
    dispatch({type: t.INITIALIZE_PLAYLIST, name: 'MyPlaylist', payload: { playLists: myPlayList }})
  }, [data, dispatch, myPlayList])

  const handleOnDragEnd = (result: DropResult) => {
    dispatch({type: t.MOVE_PLAYLIST, payload: result})
  }

  return (
    <Layout>
      <DragDropContext onDragEnd={(result, provided) => {
        handleOnDragEnd(result)
      }}>
        <PlayLists label="Playlist" list={data} />
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
  } catch(err) {
    return {
      props: {
        data: []
      }
    }
  }
}

export default Home
