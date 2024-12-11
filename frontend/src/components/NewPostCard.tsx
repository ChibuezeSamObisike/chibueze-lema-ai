import NewPostIcon from 'assets/new-post-icon.svg';
import { FC } from 'react';

interface IProps {
  onClick: () => void;
}

const NewPostCard: FC<IProps> = ({ onClick }) => {
  return (
    <div
      className='flex items-center justify-center border-r-8'
      style={{
        border: '1px dashed #D5D7DA',
        borderRadius: '8px',
      }}
    >
      <div
        className='flex-col items-center justify-center text-center sm:py-10 cursor-pointer'
        role='button'
        onClick={onClick}
      >
        <img src={NewPostIcon} alt='' className='mx-auto' />
        <h1 className='text-textPrimary'>New post</h1>
      </div>
    </div>
  );
};

export default NewPostCard;
