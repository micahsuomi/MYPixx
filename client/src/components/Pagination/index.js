import React from "react";

import "./style.scss";

const Pagination = ({ itemsPerPage, totalItems, currentPage, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <div className="pagination__header">
        <h4>Page {currentPage}</h4>
      </div>
      <ul className="pagination__wrapper">
        {pageNumbers.map((num) => (
          <li key={num} className="pagination__item">
            <button onClick={() => paginate(num)} className="pagination__btn">
              {num}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
