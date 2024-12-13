import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { User } from '@types';
import { UsersApi } from 'api/users';
import { useNavigate } from 'react-router-dom';

import { Tooltip } from 'react-tooltip';
import { truncateWithEllipses } from 'utils';

export const useUsersTable = (itemsPerPage: number) => {
  const navigate = useNavigate();

  const header = [
    {
      title: 'Fullname',
      key: 'name',
      style: {
        fontWeight: 600,
      },
    },
    {
      title: 'Email Address',
      key: 'email',
    },
    {
      title: 'Address',
      key: 'address',
      style: {
        width: '300px',
        maxWidth: '300px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    },
  ];

  const [currentPage, setCurrentPage] = useState(0);

  const {
    data: usersData,
    isPending: usersLoading,
    error,
  } = useQuery({
    queryKey: [UsersApi.GET_USERS, currentPage],
    queryFn: () => UsersApi.getUsers(currentPage),
  });

  const {
    data: countData,
    isPending: countLoading,
    error: countError,
  } = useQuery({
    queryKey: [UsersApi.GET_COUNT],
    queryFn: () => UsersApi.getCount(),
  });

  const totalPages = Math.ceil((countData?.count || 0) / itemsPerPage);

  const usersWithFullAddress = usersData?.map(
    (
      user: User & {
        city: string;
        street: string;
        state: string;
        zipcode: string;
      },
      i: number
    ) => ({
      ...user,
      address: (
        <>
          <div
            data-tooltip-id={`tooltip-${user?.id}-${i}`}
            data-tooltip-content={`${user?.street}, ${user?.city}, ${user?.state} ${user?.zipcode}`}
          >
            {truncateWithEllipses(
              `${user?.street}, ${user?.city}, ${user?.state} ${user?.zipcode}`,
              19
            )}
          </div>
          <Tooltip
            id={`tooltip-${user?.id}-${i}`}
            className='bg-gray-800 text-white text-xs rounded-md px-3 py-1'
          />
        </>
      ),
    })
  );

  const handleRowClick = (id: string): void => {
    navigate(`/user-posts/${id}`);
  };

  const handlePageChange = (selectedItem: { selected: number }): void => {
    setCurrentPage(selectedItem.selected);
  };

  const isLoading = usersLoading || countLoading;

  return {
    users: usersWithFullAddress,
    isLoading,
    totalPages,
    currentPage,
    setCurrentPage,
    error: error || countError,
    header,
    handlePageChange,
    handleRowClick,
  };
};
