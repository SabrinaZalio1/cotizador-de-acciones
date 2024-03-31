import React from 'react';

interface PaginatorProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const StockPaginator: React.FC<PaginatorProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <div className="c-pagination">
      <button type="button" className="btn btn-secondary btn-lg" onClick={handlePrevious} disabled={currentPage === 1}>
        Previous
      </button>
      <button
        type="button"
        className="btn btn-secondary btn-lg"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default StockPaginator;
