import AppTable from 'components/AppTable';
import DashboardLayout from 'layouts/DashboardLayout';
import ReactPaginate from 'react-paginate';
import { useUsersTable } from 'hooks/useUsersTable';
import BackIcon from 'assets/back-icon.svg';
import ErrorComponent from 'components/ErrorComponent';

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
      <h2 className='text-6xl mb-10'>Users</h2>
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
            <p className='mr-2'>Next</p>
            <img
              src={BackIcon}
              style={{
                rotate: '180deg',
              }}
            />
          </div>
        }
        previousLabel={
          <div className='flex items-center'>
            <img src={BackIcon} />
            <p className='ml-2'>Previous</p>
          </div>
        }
        onPageChange={handlePageChange}
        pageCount={totalPages}
        forcePage={currentPage}
        containerClassName='flex justify-end items-center space-x-2 mt-4 w-full mt-10'
        pageClassName='px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 size-[40px] flex items-center justify-center'
        activeClassName='bg-[#F9F5FF] text-[#7F56D9] size-[40px] flex items-center justify-center'
        previousClassName='px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100'
        nextClassName='px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100'
        disabledClassName='cursor-not-allowed opacity-50'
      />
    </DashboardLayout>
  );
};

export default UsersTable;
