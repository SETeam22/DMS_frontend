import React from 'react'
import Sidenav from '../components/Sidenav'
import Orders from './Orders'
import MapView from './MapView'
const Dashboard = () => {
  return (
    <div className='flex w-full'>
      <Sidenav />
      
      <div className="flex flex-1 flex-col md:flex-row"> {/* This will create a flex container for larger screens */}
        <div className="flex-1 p-5"> {/* This div will take up half the width */}
          <div className="font-medium text-gray-500 mb-4">Latest Orders</div>
          {/* Assuming Orders is another component like a list you can uncomment */}
           {/* <Orders />  */}
        </div>

        <div className="flex-1 p-5"> {/* This div will also take up half the width */}
          <MapView />
        </div>
      </div>
    </div>
    
   
    
  )
}

export default Dashboard