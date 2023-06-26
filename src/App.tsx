import React, { useEffect, useState } from 'react';
import Router from './AppRouter';
import setAuthToken from './utils/setAuthToken';

function getCurrentDimension() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

const App = () => {
  const [screenSize, setScreenSize] = useState(getCurrentDimension());

  useEffect(() => {
    setAuthToken(localStorage.getItem('token'));
  }, []);

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener('resize', updateDimension);

    if (screenSize.width >= 1200) {
      if (window.location.pathname !== '/faq') {
        const head = document.querySelector('head');
        const script = document.createElement('script');

        script.setAttribute('src', '//localhost:8081/widget.js');
        head.appendChild(script);
        return () => {
          head.removeChild(script);
        };
      }
    } else {
    }
    return () => {
      window.removeEventListener('resize', updateDimension);
    };
  }, [window.location.pathname, screenSize]);

  return (
    <div>
      <Router />
    </div>
  );
};

export default App;
