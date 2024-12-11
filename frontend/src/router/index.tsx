import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import AppLoader from 'components/AppLoader';

interface IRoutes {
  path: string;
  element: JSX.Element;
}

const UserPosts = lazy(() => import('pages/UserPosts'));
const UsersTable = lazy(() => import('pages/UsersTable'));
const NotFound = lazy(() => import('pages/NotFound'));

const routes: IRoutes[] = [
  {
    path: '/user-posts/:id',
    element: <UserPosts />,
  },
  {
    path: '/',
    element: <UsersTable />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

const router = createBrowserRouter(
  routes.map(({ path, element }) => ({
    path,
    element: <Suspense fallback={<AppLoader />}>{element}</Suspense>,
  }))
);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
