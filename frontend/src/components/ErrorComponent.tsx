import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'shared/Button';

export type ErrorComponentProps = {
  error?: Error & {
    response?: {
      data?: {
        error?: string;
      };
    };
  };
};

const ErrorComponent: React.FC<ErrorComponentProps> = ({ error }) => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center justify-center min-h-[70vh]'>
      <h1 className='text-3xl'>An unexpected error occurred</h1>
      <p className='text-xl mt-2'>
        {error?.response?.data?.error || 'Please contact support'}
      </p>
      <Button
        onClick={() => {
          navigate('/');
        }}
        className='mt-4'
      >
        Back home
      </Button>
    </div>
  );
};

export default ErrorComponent;
