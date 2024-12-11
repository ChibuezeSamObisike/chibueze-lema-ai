import DashboardLayout from 'layouts/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import Button from 'shared/Button';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <DashboardLayout>
      <div className='flex flex-col items-center'>
        <h1 className='text-5xl'>Hello! Seems you are lost</h1>
        <Button
          className='mt-3'
          onClick={() => {
            navigate('/');
          }}
        >
          Go to home
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default NotFound;
