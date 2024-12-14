import { useQuery } from '@tanstack/react-query';
import { User } from '@types';
import { UsersApi } from 'api/users';
import { ITableHeader } from 'components/AppTable';
import useMediaQuery from 'hooks/useMediaQuery';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { truncateWithEllipses } from 'utils';

export const useUsersTable = (itemsPerPage: number) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isMobile } = useMediaQuery();

  const header: ITableHeader[] = [
    {
      title: 'Fullname',
      key: 'name',
      style: {
        fontWeight: 500,
        color: '#535862',
      },
      className: 'font-[500]',
    },
    {
      title: 'Email Address',
      key: 'email',
      style: {
        textTransform: 'lowercase',
      },
    },
    {
      title: 'Address',
      key: 'address',
      style: {
        width: isMobile ? 'auto' : '300px',
        maxWidth: isMobile ? 'auto' : '300px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    },
  ];

  const queryParams = new URLSearchParams(location.search);
  const initialPage = Math.max(
    parseInt(queryParams.get('page') || '1', 10) - 1,
    0
  );

  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const newPage = currentPage + 1;
    if (parseInt(params.get('page') || '1', 10) !== newPage) {
      params.set('page', newPage.toString());
      navigate({ search: params.toString() }, { replace: true });
    }
  }, [currentPage, navigate, location.search]);

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
    navigate(`/user-posts/${id}?page=${currentPage + 1}`);
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
