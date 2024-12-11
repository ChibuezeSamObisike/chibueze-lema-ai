import { FC, PropsWithChildren } from 'react';

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='min-h-screen flex-col my-24 w-[80%] md:w-[60%] items-start text-left mx-auto justify-center'>
      {children}
    </div>
  );
};

export default DashboardLayout;