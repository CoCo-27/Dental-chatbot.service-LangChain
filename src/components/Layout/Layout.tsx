import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom/dist';
import { useNavigate, useLocation } from 'react-router-dom';

import Header from 'src/components/Header/Header';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [headerAnimation, setHeaderAnimation] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/');
    }
  }, []);

  let isDashboard = '';
  switch (location.pathname) {
    case '/':
      isDashboard = 'home';
      break;
    case '/contact':
      isDashboard = 'contact';
      break;
    case '/faq':
      isDashboard = 'faq';
      break;
    default:
      isDashboard = 'other';
      break;
  }

  return (
    <div
      className={`flex w-full justify-center ${
        isDashboard === 'home' || isDashboard === 'contact'
          ? 'h-screen'
          : 'h-full'
      }`}
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      <Header menu="flex" isSmall={headerAnimation} />
      <div className="flex justify-stretch h-100% pt-[90px] w-full relative overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
