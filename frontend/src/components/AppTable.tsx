import React from 'react';
import TableLoader from 'components/TableLoader';
import ReactPaginate from 'react-paginate';
import clsx from 'clsx';
import BackIcon from 'assets/back-icon.svg';

export interface ITableHeader {
  align?: string;
  title: string;
  key: string;
  className?: string;
  style?: React.CSSProperties;
}

type ITableData = {
  [key: string]: string | React.ReactNode;
};

interface IProps {
  header: ITableHeader[];
  tableData: ITableData[];
  isLoading?: boolean;
  onRowClick?: (id: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (selected: { selected: number }) => void;
  itemsPerPage: number;
}

const AppTable: React.FC<IProps> = ({
  header,
  tableData,
  isLoading,
  onRowClick,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <>
      <div
        style={{ border: '1px solid #E9EAEB' }}
        className='w-full rounded-lg overflow-x-auto'
      >
        <table className='w-full border-collapse'>
          <thead className='p-4'>
            <tr>
              {header.map((headerItem, index) => (
                <th
                  key={index}
                  style={{ fontWeight: 500 }}
                  className='text-left p-4 text-xs text-textPrimary'
                >
                  {headerItem.title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {!isLoading &&
              tableData.map((row: ITableData, rowIndex, arr) => (
                <tr
                  key={rowIndex}
                  onClick={() => onRowClick?.(String(row?.['id']))}
                  className={clsx(
                    'cursor-pointer',
                    arr?.length - 1 !== rowIndex && 'border-b'
                  )}
                >
                  {header.map((headerItem, cellIndex) => (
                    <td
                      key={cellIndex}
                      style={{
                        fontWeight: 300,
                        fontSize: '14px',
                        ...headerItem?.style,
                      }}
                      className={clsx(
                        'p-2 py-8 text-sm px-4 text-textPrimary ',
                        headerItem.className
                      )}
                    >
                      {row[headerItem.key]}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
        {isLoading && (
          <div className='h-[400px] flex items-center justify-center w-full'>
            <TableLoader />
          </div>
        )}
        {!isLoading && tableData?.length === 0 && (
          <div className='p-4'>
            <h4>No users found</h4>
          </div>
        )}
      </div>
      {!isLoading && tableData?.length > 0 && (
        <div className='flex justify-center sm:justify-end items-center flex-wrap space-x-2 mt-4 w-full'>
          <ReactPaginate
            breakLabel='...'
            nextLabel={
              <div className='flex items-center'>
                <p className='hidden sm:block mr-2'>Next</p>
                <img
                  src={BackIcon}
                  style={{
                    rotate: '180deg',
                  }}
                  alt='Next'
                />
              </div>
            }
            previousLabel={
              <div className='flex items-center'>
                <img src={BackIcon} alt='Previous' />
                <p className='hidden sm:block ml-2'>Previous</p>
              </div>
            }
            onPageChange={onPageChange}
            pageCount={totalPages}
            forcePage={currentPage}
            containerClassName='flex justify-center sm:justify-end items-center flex-wrap space-x-2 mt-4 w-full'
            pageClassName='px-3 py-2 text-sm font-medium rounded-md flex items-center justify-center cursor-pointer'
            activeClassName='bg-[#F9F5FF] text-[#7F56D9] flex items-center justify-center cursor-pointer'
            previousClassName='px-3 py-2 text-sm font-medium rounded-md cursor-pointer'
            nextClassName='px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 cursor-pointer'
            disabledClassName='cursor-not-allowed opacity-50'
          />
        </div>
      )}
    </>
  );
};

export default AppTable;
