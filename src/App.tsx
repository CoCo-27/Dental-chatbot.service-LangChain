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
      setScreenSize((prevSize) => ({ ...prevSize, ...getCurrentDimension() }));
    };
    window.addEventListener('resize', updateDimension);
    return () => {
      window.removeEventListener('resize', updateDimension);
    };
  }, []);

  useEffect(() => {
    const head = document.querySelector('body');
    const script = document.createElement('script');
    script.setAttribute('id', 'widgets');

    if (window.location.pathname !== '/faq') {
      if (screenSize.width >= 1200) {
        script.setAttribute('src', '//localhost:8081/widget.js');
        head.appendChild(script);
      } else {
        const widgetsELem = document.getElementById('widgets');
        const chatWidget = document.getElementById('jeeves-chat-widget');
        if (widgetsELem !== null) {
          widgetsELem.remove();
        }
        if (chatWidget !== null) {
          chatWidget.remove();
        }
      }
    }
    return () => {
      if (screenSize.width >= 1200) {
        head.removeChild(script);
      }
    };
  }, [window.location.pathname, screenSize.width]);

  return (
    <div>
      <Router />
    </div>
  );
};

export default App;
