import React, { useState } from 'react';
import { useTable, usePagination, useFilters } from 'react-table';

function DataTable({ columns, data, pageSizeOptions = [5, 10, 20] }) {
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);
  const {
    page,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    setPageSize: setTablePageSize,
    state: { pageIndex, filters },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: pageSizeOptions[0] },
    },
    useFilters,
    usePagination
  );

  function handlePageSizeChange(e) {
    setPageSize(Number(e.target.value));
    setTablePageSize(Number(e.target.value));
  }

  return (
    <>
      <div>
        <select value={pageSize} onChange={handlePageSizeChange}>
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search"
          value={filters[0]?.value || ''}
          onChange={(e) => {
            const value = e.target.value || undefined;
            setFilters([{ id: 'name', value }]);
          }}
        />
      </div>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.Header}>{column.render('Header')}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr key={row.index}>
                {row.cells.map((cell) => (
                  <td key={cell.column.Header}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageCount}
          </strong>{' '}
        </span>
      </div>
    </>
  );
}
