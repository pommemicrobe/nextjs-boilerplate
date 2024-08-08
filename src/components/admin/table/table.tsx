'use client';

import { useState } from 'react';

type TableProps = {
  table: {
    headers: string[];
    rows: any[][];
    pagination?: {
      currentPage?: number;
      itemsPerPage: number;
      totalItems?: number;
      changePageAction?: (page: number) => Promise<any[][]>;
    };
  };
};

export default function Table({ table }: TableProps) {
  const [currentPage, setCurrentPage] = useState(
    table.pagination?.currentPage || 1,
  );

  const itemsPerPage = table.pagination?.itemsPerPage || table.rows.length;
  const totalItems = table.pagination?.totalItems || table.rows.length;
  const numberOfPages = Math.ceil(totalItems / itemsPerPage);

  const changePage = async (page: number) => {
    if (page < 1 || page > numberOfPages || page === currentPage) return;

    if (table.pagination?.changePageAction) {
      try {
        table.rows = await table.pagination.changePageAction(page);
      } catch (error) {
        return;
      }
    }

    setCurrentPage(page);
  };

  const displayHeaders = () => {
    return table.headers.map((header: string, index: number) => (
      <th key={index} scope="col" className="px-6 py-3">
        {header}
      </th>
    ));
  };

  const displayRows = () => {
    let sliceRows = [];

    if (table.pagination?.changePageAction) {
      sliceRows = table.rows;
    } else {
      sliceRows = table.rows.slice(
        currentPage * itemsPerPage - itemsPerPage,
        currentPage * itemsPerPage,
      );
    }

    return sliceRows.map((row: any[], index: number) => (
      <tr
        key={index}
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
      >
        {row.map((cell: any, index: number) => (
          <td key={index} className="px-6 py-4">
            {cell}
          </td>
        ))}
      </tr>
    ));
  };

  const displayPagination = () => {
    return (
      <nav
        className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          Showing{' '}
          <span className="font-semibold text-gray-900 dark:text-white">
            {currentPage * itemsPerPage - itemsPerPage + 1}-
            {currentPage * itemsPerPage > table.rows.length
              ? table.rows.length
              : currentPage * itemsPerPage}
          </span>{' '}
          of{' '}
          <span className="font-semibold text-gray-900 dark:text-white">
            {table.pagination?.totalItems || table.rows.length}
          </span>
        </span>

        {numberOfPages > 1 && (
          <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                onClick={() => changePage(currentPage - 1)}
              >
                Previous
              </a>
            </li>

            {displayPaginationPage()}

            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                onClick={() => changePage(currentPage + 1)}
              >
                Next
              </a>
            </li>
          </ul>
        )}
      </nav>
    );
  };

  const displayPaginationPage = () => {
    let sequence = [1, 2, 3, 4, 5];

    if (numberOfPages < 5) sequence = sequence.slice(0, numberOfPages);

    if (currentPage > numberOfPages - 2) {
      sequence = sequence.map(num => num + numberOfPages - sequence.length);
    } else if (currentPage > 3) {
      sequence = sequence.map(num => num + currentPage - 3);
    } else {
      sequence = sequence.map(num => num);
    }

    return (
      <>
        {sequence.map(num => (
          <li key={num}>
            <a
              href="#"
              className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                num === currentPage ? 'bg-blue-50 text-blue-600' : ''
              }`}
              onClick={() => changePage(num)}
            >
              {num}
            </a>
          </li>
        ))}
      </>
    );
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>{displayHeaders()}</tr>
        </thead>

        <tbody>{displayRows()}</tbody>
      </table>

      {displayPagination()}
    </div>
  );
}
