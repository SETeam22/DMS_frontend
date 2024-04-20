import React from 'react'
import Sidenav from '../components/Sidenav'
import DataEmplyoee from './DataEmplyoee'
import Adminnav from '../components/Adminnav';
const Drivers = () => {
  return (
    <div>
        <div className="flex w-full">
        <Sidenav /> 
        <div className="flex flex-1 flex-col">
        <Adminnav />
        <div className="flex-1"> {/* Equivalent to flex: 6 but more commonly flex-1 is used for the main content area */}
        <DataEmplyoee />
          {/* <Navbar/> */}
        {/* <Datatable/> */}
  </div>
  </div>
</div>

    </div>
  )
}

export default Drivers