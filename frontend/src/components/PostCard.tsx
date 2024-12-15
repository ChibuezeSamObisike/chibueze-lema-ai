import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PostsApi } from 'api/posts';
import DeleteIcon from 'assets/delete-icon.svg';
import CircularLoader from 'components/CircularProgress';
import { FC } from 'react';
import toast from 'react-hot-toast';
import { truncateWithEllipses } from 'utils';

interface IProps {
  title: string;
  body: string;
  id: string;
}

const PostCard: FC<IProps> = ({ title, body, id }) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: () => PostsApi.deletePost(id),
    onSuccess: () => {
      toast.success('Post deleted successfully');
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post. Please try again.');
    },
  });

  const handleDeleteClick = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      mutate();
    }
  };

  return (
    <div
      style={{
        border: '1px solid #D5D7DA',
        borderRadius: '8px',
      }}
      className='px-6 pb-8 pt-4 border-s-[#D5D7DA] shadow-md hover:shadow-xl'
    >
      <div className='flex items-center w-full'>
        {isPending ? (
          <CircularLoader
            color='red'
            size={12}
            className={`flex ml-auto mb-4`}
          />
        ) : (
          <img
            src={DeleteIcon}
            role='button'
            className={`w-3 flex ml-auto cursor-pointer mb-4 ${
              isPending ? 'opacity-50' : ''
            }`}
            onClick={handleDeleteClick}
            alt='Delete post'
          />
        )}
      </div>
      <h4
        style={{ fontWeight: 500, wordWrap: 'break-word' }}
        className='mb-3 text-xl text-textPrimary'
      >
        {title}
      </h4>
      <p
        style={{
          fontWeight: 300,
          lineHeight: '20px',
          fontSize: '14px',
          wordWrap: 'break-word',
        }}
        className='text-textPrimary leading-7'
      >
        {truncateWithEllipses(body, 350)}
      </p>
    </div>
  );
};

export default PostCard;
