import { Navigate, Outlet } from 'react-router-dom';
// import { ThemeProvider } from '@mui/material';
import { SecurableRoute } from '@astarx-studio/react-core/router';
// import LoginLayout from 'layouts/LoginLayout';
// import DashboardLayout from 'layouts/DashboardLayout';
// import Customer from './customer';
import Landing from './landing';
// import { LightTheme } from 'resource/themes';
import ProtectedRoute from 'components/protected-route';
import Client from 'dummy-pages/Client';
import Admin from 'dummy-pages/Admin';

const routes: SecurableRoute[] = [
  {
    index: true,
    element: <Navigate to="/" />,
  },
  {
    path: 'landing',
    element: <Landing />,
  }, 
  {
    path: 'client',
    element: (
      <ProtectedRoute requiredRole="client">
        <Client />
      </ProtectedRoute>
    ),
  },
  {
    path: 'admin',
    element: (
      <ProtectedRoute requiredRole="admin">
        <Admin />
      </ProtectedRoute>
    ),
  },

  // {
  //   path: 'admin',
  //   element: (
  //     <ThemeProvider theme={LightTheme}>
  //       <Outlet />
  //     </ThemeProvider>
  //   ),
  //   children: [
  //     {
  //       index: true,
  //       element: <Navigate to="login" />,
  //     },
  //     {
  //       path: 'login',
  //       element: <LoginLayout />,
  //     },
  //     {
  //       path: 'dashboard',
  //       element: <DashboardLayout />,
  //       children: [
  //         {
  //           index: true,
  //           element: <>This... Is... DASHBOARD!!!</>,
  //         },
  //       ],
  //     },
  //   ],
  // },
];

export default routes;
