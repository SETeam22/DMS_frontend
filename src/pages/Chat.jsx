import React from 'react'
import Sidenav from '../components/Sidenav'
import Adminnav from '../components/Adminnav'

const Chat = () => {
  return (
    <div className='flex w-full'>
      <Sidenav />
    <div className="flex flex-1 flex-col">
      <Adminnav />
    </div>
    </div>
  )
}

export default Chat