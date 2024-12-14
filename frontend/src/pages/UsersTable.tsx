import AppTable from 'components/AppTable';
import DashboardLayout from 'layouts/DashboardLayout';
import ReactPaginate from 'react-paginate';
import { useUsersTable } from 'hooks/useUsersTable';
import BackIcon from 'assets/back-icon.svg';
import ErrorComponent from 'components/ErrorComponent';

import 'App.css';

const UsersTable = () => {
  const itemsPerPage = 4;

  const {
    header,
    users,
    isLoading,
    totalPages,
    currentPage,
    handleRowClick,
    handlePageChange,
    error,
  } = useUsersTable(itemsPerPage);

  if (error && !isLoading) {
    return <ErrorComponent error={error} />;
  }

  return (
    <DashboardLayout>
      <h2 style={{ fontWeight: 500 }} className='text-6xl mb-10 text-[#181D27]'>
        Users
      </h2>
      <AppTable
        onRowClick={handleRowClick}
        tableData={users}
        header={header}
        isLoading={isLoading}
      />
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
        onPageChange={handlePageChange}
        pageCount={totalPages}
        forcePage={currentPage}
        containerClassName='flex justify-center sm:justify-end items-center flex-wrap space-x-2 mt-4 w-full'
        pageClassName='px-3 py-2 text-sm font-medium rounded-md flex items-center justify-center cursor-pointer'
        activeClassName='bg-[#F9F5FF] text-[#7F56D9] flex items-center justify-center cursor-pointer'
        previousClassName='px-3 py-2 text-sm font-medium rounded-md cursor-pointer'
        nextClassName='px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 cursor-pointer'
        disabledClassName='cursor-not-allowed opacity-50'
        renderOnZeroPageCount={null}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
      />
    </DashboardLayout>
  );
};

export default UsersTable;
