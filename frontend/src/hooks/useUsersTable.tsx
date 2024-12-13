import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { User } from '@types';
import { UsersApi } from 'api/users';
import { useNavigate } from 'react-router-dom';

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
      className:
        'w-[300px] max-w-[300px] whitespace-nowrap overflow-hidden text-ellipsis',
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
      }
    ) => ({
      ...user,
      address: `${user?.street}, ${user?.city}, ${user?.state} ${user?.zipcode}`,
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
