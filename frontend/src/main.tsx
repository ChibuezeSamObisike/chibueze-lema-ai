import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { toastOption } from 'config';
import AppRouter from 'router/index.tsx';
import ErrorBoundary from 'components/ErrorBoundary';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Toaster toastOptions={toastOption} />
        <AppRouter />
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>
);
