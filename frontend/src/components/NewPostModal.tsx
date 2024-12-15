import React from 'react';
import Modal from './Modal';
import PostTitleInput from 'shared/PostInput';
import PostContentTextarea from 'shared/PostTextField';
import Button from 'shared/Button';
import { useNewPost } from 'hooks/useNewPost';

interface NewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewPostModal: React.FC<NewPostModalProps> = ({ isOpen, onClose }) => {
  const { register, handleSubmit, errors, isLoading } = useNewPost(onClose);

  return (
    <Modal isOpen={isOpen}>
      <h2 className='text-3xl mb-4'>New Post</h2>
      <form className='space-y-4' onSubmit={handleSubmit}>
        <div>
          <PostTitleInput
            {...register('title')}
            placeholder='Give your post a title'
            className='placeholder:text-[#94A3B8] placeholder:font-[300]'
          />
          {errors.title && (
            <p className='text-red-500 text-sm mt-1'>{errors.title.message}</p>
          )}
        </div>

        <div className='mt-5'>
          <PostContentTextarea
            {...register('content')}
            placeholder='Write something mind-blowing'
            className='placeholder:text-[#94A3B8] placeholder:font-[300]'
          />
          {errors.content && (
            <p className='text-red-500 text-sm mt-1'>
              {errors.content.message}
            </p>
          )}
        </div>

        <div className='flex justify-end space-x-4'>
          <Button variant='secondary' onClick={onClose}>
            Cancel
          </Button>
          <Button isLoading={isLoading} type='submit'>
            Publish
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default NewPostModal;
