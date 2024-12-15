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
        <label
          style={{ letterSpacing: '0.1px' }}
          className='block text-md text-textPrimary mb-1 font-[500]'
        >
          {label}
        </label>
        <input
          ref={ref}
          type='text'
          placeholder={placeholder}
          className={`w-full border border-gray-300 rounded-md p-2 focus:outline-none  ${
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
