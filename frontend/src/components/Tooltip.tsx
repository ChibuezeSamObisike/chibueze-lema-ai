import React, { ReactNode } from 'react';

interface TooltipProps {
  children: ReactNode;
  content: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, content }) => {
  return (
    <div className='relative flex items-center justify-center group z-50'>
      {children}

      <div className='absolute bottom-full mb-2 hidden w-max px-3 py-2 text-sm z-100 text-black bg-white p-2 rounded-md shadow-md group-hover:block'>
        {content}
      </div>
    </div>
  );
};

export default Tooltip;
