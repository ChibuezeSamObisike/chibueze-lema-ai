import { useQuery } from '@tanstack/react-query';
import { PostsApi } from 'api/posts';
import { UsersApi } from 'api/users';
import { Post, User } from '@types';
import toast from 'react-hot-toast';

interface UseUserPostsProps {
  userId: string;
}

export const useUserPosts = ({ userId }: UseUserPostsProps) => {
  const {
    data: posts,
    isLoading: postsLoading,
    error,
  } = useQuery<Post[]>({
    queryKey: [PostsApi.GET_POSTS, userId],
    queryFn: () => PostsApi.getPosts(userId),
  });

  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useQuery<User>({
    queryKey: [UsersApi.GET_USER, userId],
    queryFn: () => UsersApi.getUserById(userId),
  });

  const isLoading = postsLoading || userLoading;

  if (error) {
    toast.error('An error occured' + error?.message);
  }

  return {
    posts,
    user,
    isLoading,
    error: error || userError,
  };
};
