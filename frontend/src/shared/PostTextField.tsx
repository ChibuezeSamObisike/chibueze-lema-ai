import { forwardRef, TextareaHTMLAttributes } from 'react';

interface PostContentTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const PostContentTextarea = forwardRef<
  HTMLTextAreaElement,
  PostContentTextareaProps
>(
  (
    {
      label = 'Post content',
      placeholder = 'Write something mind-blowing',
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div>
        <label
          style={{ letterSpacing: '0.1px' }}
          className='block text-md font-[500] text-textPrimary mb-1'
        >
          {label}
        </label>
        <textarea
          ref={ref}
          placeholder={placeholder}
          className={`w-full border border-gray-300 rounded-md p-2 focus:outline-none ${
            className || ''
          }`}
          rows={6}
          {...props}
        ></textarea>
      </div>
    );
  }
);

PostContentTextarea.displayName = 'PostContentTextarea';

export default PostContentTextarea;
