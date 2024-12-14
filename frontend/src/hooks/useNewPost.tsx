import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PostsApi } from 'api/posts';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const schema = yup.object().shape({
  title: yup
    .string()
    .required('Title is required')
    .max(100, 'Title cannot exceed 100 characters')
    .min(6, 'Title cannot be less than 6 characters'),
  content: yup
    .string()
    .required('Content is required')
    .min(6, 'Content cannot be less than 6 characters'),
});

interface FormInputs {
  title: string;
  content: string;
}

export const useNewPost = (onClose: () => void) => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (body: FormInputs) => {
      await PostsApi.addPosts({
        user_id: id!,
        title: body?.title,
        content: body?.content,
      });
    },
    onSuccess: () => {
      toast.success('Post published!');
      queryClient.invalidateQueries();
      reset();
      onClose();
    },
    onError: (err) => {
      console.error('Error creating post:', err);
      toast.error('Failed to publish post');
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    mutate(data);
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isLoading: isPending,
  };
};
