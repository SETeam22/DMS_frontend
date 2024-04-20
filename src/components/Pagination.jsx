const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <div className="flex justify-center">
        {pageNumbers.map(number => (
          <button key={number} onClick={() => paginate(number)} className="mx-1 px-3 py-1 bg-gray-200 rounded hover:bg-gray-400">
            {number}
          </button>
        ))}
      </div>
    );
  };
  