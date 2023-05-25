import React, { useEffect } from 'react';
import Router from './AppRouter';
import setAuthToken from './utils/setAuthToken';

const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.getItem('token'));
  }, []);

  useEffect(() => {
    if (window.location.pathname !== '/faq') {
      const head = document.querySelector('head');
      const script = document.createElement('script');

      script.setAttribute('src', '//localhost:8081/widget.js');
      head.appendChild(script);
      return () => {
        head.removeChild(script);
      };
    }
  }, [window.location.pathname]);

  return (
    <div>
      <Router />
    </div>
  );
};

export default App;
