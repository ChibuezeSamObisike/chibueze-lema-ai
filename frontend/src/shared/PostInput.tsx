import { forwardRef, InputHTMLAttributes } from 'react';

interface PostTitleInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
}

const PostTitleInput = forwardRef<HTMLInputElement, PostTitleInputProps>(
  (
    {
      label = 'Post title',
      placeholder = 'Give your post a title',
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div>
        <label className='block text-md font-medium text-gray-700 mb-1'>
          {label}
        </label>
        <input
          ref={ref}
          type='text'
          placeholder={placeholder}
          className={`w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            className || ''
          }`}
          {...props}
        />
      </div>
    );
  }
);

PostTitleInput.displayName = 'PostTitleInput';

export default PostTitleInput;
