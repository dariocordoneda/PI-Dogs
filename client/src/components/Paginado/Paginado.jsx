import React from "react";
import "./PaginadoStyles.css";

export default function Paginado({
  dogsPerPage,
  allDogs,
  paginado,
  currentPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="paginado">
        {currentPage > 1 && (
          <>
            <li>
              <button onClick={() => paginado(1)}>
                <strong>{"<<"}</strong>
              </button>
            </li>
            <li>
              <button onClick={() => paginado(currentPage - 1)}>
                <strong>{"<"}</strong>
              </button>
            </li>
          </>
        )}
        {pageNumbers &&
          pageNumbers.map((num) => (
            <li className={num === currentPage ? "active" : ""} key={num}>
              <button onClick={() => paginado(num)}>
                <strong>{num}</strong>
              </button>
            </li>
          ))}
        {currentPage < pageNumbers.length && (
          <>
            <li>
              <button onClick={() => paginado(currentPage + 1)}>
                <strong>{">"}</strong>
              </button>
            </li>
            <li>
              <button onClick={() => paginado(pageNumbers.length)}>
                <strong>{">>"}</strong>
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
