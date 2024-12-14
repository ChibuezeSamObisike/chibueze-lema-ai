import NewPostCard from 'components/NewPostCard';
import PostCard from 'components/PostCard';
import DashboardLayout from 'layouts/DashboardLayout';
import BackIcon from 'assets/back-icon.svg';
import NewPostModal from 'components/NewPostModal';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import TableLoader from 'components/TableLoader';
import { useModalDisclosure } from 'hooks/useModalDisclosure';
import { useUserPosts } from 'hooks/useUserPosts';
import ErrorComponent from 'components/ErrorComponent';

const UserPosts = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const { isOpen, closeModal, openModal } = useModalDisclosure();
  const { posts, user, isLoading, error } = useUserPosts({ userId: id! });

  const queryParams = new URLSearchParams(location.search);
  const currentPage = queryParams.get('page') || '0';

  if (isLoading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <TableLoader />
      </div>
    );
  }

  if (error && !isLoading) {
    return <ErrorComponent error={error} />;
  }

  return (
    <DashboardLayout>
      <NewPostModal isOpen={isOpen} onClose={closeModal} />
      <div>
        <p
          role='button'
          onClick={() => navigate(`/?page=${currentPage}`)}
          className='text-textPrimary mb-3 font-600 flex'
        >
          <img src={BackIcon} alt='Back' />
          <span style={{ fontWeight: 600 }} className='ml-2 text-textPrimary'>
            Back to users
          </span>
        </p>
        <h2 className='text-4xl mb-2 text-[#181D27]'>{user?.name}</h2>
        <p className='text-textPrimary mb-4 flex'>
          <span style={{ fontWeight: 300 }} className='mr-1'>
            {user?.email?.toLowerCase()}{' '}
          </span>
          <span style={{ fontWeight: 500 }}>• {posts?.length} Posts</span>
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
        <NewPostCard onClick={openModal} />
        {posts?.map((post, i) => (
          <PostCard {...post} key={i} />
        ))}
      </div>
    </DashboardLayout>
  );
};

export default UserPosts;
