import TableLoader from 'components/TableLoader';
import { CSSProperties, FC, ReactNode } from 'react';
import clsx from 'clsx';

interface ITableHeader {
  align?: string;
  title: string;
  key: string;
  className?: string;
  style?: CSSProperties;
}

type ITableData = {
  [key: string]: string | ReactNode;
};

interface IProps {
  header: ITableHeader[];
  tableData: ITableData[];
  isLoading?: boolean;
  onRowClick?: (id: string) => void;
}

const AppTable: FC<IProps> = ({ header, tableData, isLoading, onRowClick }) => {
  return (
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
                    style={{ fontWeight: 400, ...headerItem?.style }}
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
        <div>
          <h4>No users found</h4>
        </div>
      )}
    </div>
  );
};

export default AppTable;
