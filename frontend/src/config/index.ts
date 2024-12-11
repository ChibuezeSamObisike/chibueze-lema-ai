import { DefaultToastOptions } from 'react-hot-toast';

export const toastOption: DefaultToastOptions = {
  success: {
    style: {
      background: 'green',
      color: '#fff',
      textTransform: 'capitalize',
    },
  },
  error: {
    style: {
      background: 'red',
      color: '#fff',
      textTransform: 'capitalize',
    },
  },
};
