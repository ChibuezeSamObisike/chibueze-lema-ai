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
        <label className='block text-md font-medium text-gray-700 mb-1'>
          {label}
        </label>
        <textarea
          ref={ref}
          placeholder={placeholder}
          className={`w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            className || ''
          }`}
          rows={4}
          {...props}
        ></textarea>
      </div>
    );
  }
);

PostContentTextarea.displayName = 'PostContentTextarea';

export default PostContentTextarea;
