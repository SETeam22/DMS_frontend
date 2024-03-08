import React from 'react'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Sidenav from '../components/Sidenav';

const Orders = () => {
  const rows = [
    {
        id: 1143155,
        product: "Acer Nitro 5",
        customer: "John Smith",
        date: "1 March",
        pick: "xyz",
        drop: "abc",
        driver: "Jon Snow",
        status: "Delivered",
      },
      {
        id: 2235235,
        product: "Playstation 5",
        
        customer: "Michael Doe",
        date: "1 March",
        pick: "xyz",
        drop: "abc",
        driver: "Jon Snow",
        status: "Not Delivered",
      },
      {
        id: 2342353,
        product: "Redragon S101",       
        customer: "John Smith",
        date: "1 March",       
        pick: "xyz",
        drop: "abc",
        driver: "Jon Snow",
        status: "Not Delivered",
      },
      {
        id: 2357741,
        product: "Razer Blade 15",      
        customer: "Jane Smith",
        date: "1 March", 
        pick: "xyz",
        drop: "abc",
        driver: "Jon Snow",
        status: "Delivered",
      },
      {
        id: 2342355,
        product: "ASUS ROG Strix",
        customer: "Harold Carol",
        date: "1 March",        
        pick: "xyz",
        drop: "abc",
        driver: "Jon Snow",
        status: "Not Delivered",

       
      },
  ];

  return (
   <div className="flex">
     <Sidenav /> 
    <div className="shadow-lg p-5 m-5">
        <div className="font-medium text-gray-500 mb-4">Latest Orders</div>
    <TableContainer component={Paper} className="shadow-md">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="font-medium">Order ID</TableCell>
            <TableCell className="font-medium">Service</TableCell>
            <TableCell className="font-medium">Customer</TableCell>
            <TableCell className="font-medium">Date</TableCell>
            <TableCell className="font-medium">Pick Up</TableCell>
            <TableCell className="font-medium">Drop off</TableCell>
            <TableCell className="font-medium">Driver</TableCell>
            <TableCell className="font-medium">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.product}</TableCell>
              <TableCell>{row.customer}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.pick}</TableCell>
              <TableCell>{row.drop}</TableCell>
              <TableCell>{row.driver}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${row.status === 'Delivered' ? 'text-green-600 bg-green-100' : 'text-yellow-600 bg-yellow-100'}`}>
                  {row.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  </div>          
  );
};


export default Orders;