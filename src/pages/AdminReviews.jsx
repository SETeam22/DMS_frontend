import React from 'react'
import Sidenav from '../components/Sidenav'
import Adminnav from '../components/Adminnav'

const AdminReviews = () => {
  return (

    <><div className='flex w-full'>
          <Sidenav />
          <div className="flex flex-1 flex-col">
              <Adminnav />
          </div>
      </div><div>AdminReviews</div></>
  )
}

export default AdminReviews