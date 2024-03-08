import React from 'react'
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "./datablesource";
import { Link } from "react-router-dom";
import { useState } from "react";

const DataEmplyoee = () => {
    const [data, setData] = useState(userRows);

    const handleDelete = (id) => {
      setData(data.filter((item) => item.id !== id));
    };
  
    const actionColumn = [
      {
        field: "action",
        headerName: "Action",
        width: 200,
        renderCell: (params) => {
          return (
            <div className="flex items-center gap-3">
              <Link to="/users/test" className="text-decoration-none">
                <div className="viewButton bg-blue-500 text-white py-1 px-2 rounded cursor-pointer">View</div>
              </Link>
              <div
                className="deleteButton bg-red-500 text-white py-1 px-2 rounded cursor-pointer"
                onClick={() => handleDelete(params.row.id)}
              >
                Delete
              </div>
            </div>
          );
        },
      },
    ];
    return (
      <div className="h-[600px] p-5">
        <div className="w-full text-2xl text-gray-500 mb-2 flex items-center justify-between">
          Drivers
          <Link to="/new" className="link text-green-500 border-green-500 border text-sm font-normal py-1 px-2 rounded cursor-pointer no-underline">
            Add New
          </Link>
        </div>
        <DataGrid
          className="datagrid"
          rows={data}
          columns={userColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
      </div>
    );
  };
  

export default DataEmplyoee

