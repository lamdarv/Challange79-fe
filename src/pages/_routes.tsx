// import { ThemeProvider } from '@mui/material';
// import LoginLayout from 'layouts/LoginLayout';
// import DashboardLayout from 'layouts/DashboardLayout';
// import Customer from './customer';
// import { LightTheme } from 'resource/themes'
import { Navigate } from 'react-router-dom';
import { SecurableRoute } from '@astarx-studio/react-core/router';
import Landing from './landing';
import ProtectedRoute from 'components/protected-route';
import Client from 'dummy-pages/Client';
import Admin from 'dummy-pages/Admin';
import Main from './main';
import TalentCardList from 'components/talent-card-list';
import { TalentProvider } from './TalentContext';

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
    path: 'main',
    element: (
      <TalentProvider>
        <Main />
      </TalentProvider>
    ),
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
