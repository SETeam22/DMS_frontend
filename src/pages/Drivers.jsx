import React from 'react'
import Sidenav from '../components/Sidenav'
import DataEmplyoee from './DataEmplyoee'
const Drivers = () => {
  return (
    <div>
        <div className="flex w-full">
        <Sidenav className="flex-shrink-0 w-[specific-width]"/> {/* Adjust width as necessary */}
        <div className="flex-1"> {/* Equivalent to flex: 6 but more commonly flex-1 is used for the main content area */}
        <DataEmplyoee />
          {/* <Navbar/> */}
        {/* <Datatable/> */}
  </div>
</div>

    </div>
  )
}

export default Drivers