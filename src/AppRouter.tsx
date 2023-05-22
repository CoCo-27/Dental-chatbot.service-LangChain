import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//import Layout
import Layout from './components/Layout/Layout';
// imports pages
import Chat from './pages/Chat/Chat';
import Login from './pages/Auth/Login/Login';
import SignUp from './pages/Auth/Register/Register';
import ForgotPassword from './pages/Auth/ForgotPassword/ForgotPassword';
import CheckPassword from './pages/Auth/ForgotPassword/CheckPassword';
import ResetPassword from './pages/Auth/ResetPassword/ResetPassword';
import Privacy from './components/Footer/Privacy/Privacy';
import Terms from './components/Footer/Terms/Terms';
import Disclaimer from './components/Footer/Disclaimer/Disclaimer';
import ContactUs from './components/ContactUs/ContactUs';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signUp',
    element: <SignUp />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Chat />,
      },
      {
        path: '/policy',
        element: <Privacy />,
      },
      {
        path: '/terms',
        element: <Terms />,
      },
      {
        path: '/disclaimer',
        element: <Disclaimer />,
      },
      {
        path: '/forgotpassword',
        element: <ForgotPassword />,
      },
      {
        path: '/checkpassword/:id',
        element: <CheckPassword />,
      },
      {
        path: '/ResetPassword/:id',
        element: <ResetPassword />,
      },
      {
        path: '/contact',
        element: <ContactUs />,
      },
    ],
  },
]);

function Routes() {
  return <RouterProvider router={router} />;
}

export default Routes;
