import React from 'react'
import { Data } from '../../types/Playlist'

interface PlayListItemProps {
  item: Data,
}

function PlayListItem({ item }: PlayListItemProps) {
  const { id, images, name, description } = item;

  return (
    <div
      key={id}
      className="flex gap-2 py-1 mb-2 border-b border-gray-600 cursor-pointer"
    >
      <img src={images[0].url} width={80} height={80} style={{ objectFit: 'cover' }} className="select-none" alt="playlist thumbnail" />
      <p className='flex flex-col select-none'>
        <span className='text-xl'>{name}</span>
        <span className='text-base' >{description}</span>
      </p>
    </div>
  )
}

export default PlayListItem
