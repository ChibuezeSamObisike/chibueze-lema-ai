import AppTable from 'components/AppTable';
import DashboardLayout from 'layouts/DashboardLayout';
import { useUsersTable } from 'hooks/useUsersTable';
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
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
      />
    </DashboardLayout>
  );
};

export default UsersTable;
