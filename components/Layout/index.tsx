import React from 'react'

const Layout: React.FC = ({children}) => {
  return (
    <div className='flex min-h-screen bg-gray-200 flex-col'>
      <div className='flex justify-center py-2 text-xl sm:text-3xl px-2 font-semibold text-gray-700 shadow font-serif'>
        Spotify Personal Playlist
      </div>
      <div className='flex-1 flex flex-col justify-center gap-2 py-12 px-4 sm:flex-row'>
        {children}
      </div>
      <footer className='p-2 justify-center flex bg-gray-800 text-white'>Spotify Playlist by Rahul Agrawal</footer>
    </div>
  )
}

export default Layout