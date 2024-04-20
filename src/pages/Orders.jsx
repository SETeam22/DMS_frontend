
import React, { useState } from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Sidenav from '../components/Sidenav';
import Adminnav from '../components/Adminnav';

const Orders = () => {
  const [orderRows, setOrderRows] = useState([

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
      status: "",
    },
    {
      id: 2342353,
      product: "Redragon S101",       
      customer: "John Smith",
      date: "1 March",       
      pick: "xyz",
      drop: "abc",
      driver: "Jon Snow",
      status: "",
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
      status: "",

     
    },
    // ...Your initial data
  ]);

  // Handler for changing the status
  const handleStatusChange = (event, id) => {
    setOrderRows(orderRows.map((row) =>
      row.id === id ? { ...row, status: event.target.value } : row
    ));
  };

  return (
    <div className="flex">
      <Sidenav /> 
      <div className="flex flex-1 flex-col">
      <Adminnav />
    
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
              {orderRows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.product}</TableCell>
                  <TableCell>{row.customer}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.pick}</TableCell>
                  <TableCell>{row.drop}</TableCell>
                  <TableCell>{row.driver}</TableCell>
                  <TableCell>
                    <Select
                      value={row.status}
                      onChange={(event) => handleStatusChange(event, row.id)}
                      size="small"
                      sx={{ m: 1, minWidth: 120 }}
                    >
                      <MenuItem value="Out for Pickup">Out for Pickup</MenuItem>
                      <MenuItem value="Out for Delivery">Out for Delivery</MenuItem>
                      <MenuItem value="Delivered">Delivered</MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      </div>
    </div>          
  );
};

export default Orders;

