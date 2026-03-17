import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { WelcomePage } from '@/pages/WelcomePage';
import { UsersPage } from '@/pages/UsersPage';
import { GroupsPage } from '@/pages/GroupsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <WelcomePage /> },
      { path: 'users', element: <UsersPage /> },
      { path: 'groups', element: <GroupsPage /> },
    ],
  },
]);
