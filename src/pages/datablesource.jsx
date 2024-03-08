export const userColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "Name",
      headerName: "Employee",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={`cellWithNames ${params.row.Name}`}>
            {params.row.Name}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 230,
    },
  
    {
      field: "age",
      headerName: "Age",
      width: 100,
    },
    {
      field: "order",
      headerName: "Order ID",
      width: 100,
    },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        const statusClasses = {
          active: "bg-green-50 text-green-500",
          inactive: "bg-red-50 text-red-500"
        };
        const statusClass = statusClasses[params.row.status] || '';
        return (
          <div className={`cellWithStatus ${statusClass} p-1 rounded`}>
            {params.row.status}
          </div>
        );
      },
    },
  ];
  
  //temporary data
  export const userRows = [
    {
      id: 1,
      username: "Snow",
      Name: "Jon Snow",
      status: "active",
      email: "1snow@gmail.com",
      age: 35,
      order: 1143155
    },
    {
      id: 2,
      username: "Jamie Lannister",
      Name: "Jamie Lannister",
      email: "2snow@gmail.com",
      status: "inactive",
      age: 42,
    },
    {
      id: 3,
      username: "Lannister",
      Name: "Jamie Lannister",
      email: "3snow@gmail.com",
      status: "active",
      age: 45,
      order: 2235235
    },
    {
      id: 4,
      username: "Stark",
      Name: "Jamie Lannister",
      email: "4snow@gmail.com",
      status: "inactive",
      age: 16,
    },
    {
      id: 5,
      username: "Targaryen",
      Name: "Jamie Lannister",
      email: "5snow@gmail.com",
      status: "active",
      age: 22,
      order: 2342353
    },
    {
      id: 6,
      username: "Melisandre",
      Name: "Jamie Lannister",
      email: "6snow@gmail.com",
      status: "active",
      age: 15,
      order: 2357741
    },
    {
      id: 7,
      username: "Clifford",
      Name: "Jamie Lannister",
      email: "7snow@gmail.com",
      status: "inactive",
      age: 44,
    },
    {
      id: 8,
      username: "Frances",
      Name: "Jamie Lannister",
      email: "8snow@gmail.com",
      status: "inactive",
      age: 36,
    },
    {
      id: 9,
      username: "Roxie",
      Name: "Jamie Lannister",
      email: "snow@gmail.com",
      status: "active",
      age: 65,
      order: 2342355
    },
    {
      id: 10,
      username: "Roxie",
      Name: "Jamie Lannister",
      email: "snow@gmail.com",
      status: "inactive",
      age: 65,
    },
  ];