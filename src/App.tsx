import React, { useEffect } from 'react';
import Router from './AppRouter';
import setAuthToken from './utils/setAuthToken';

const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.getItem('token'));
  }, []);

  return (
    <div>
      <Router />
    </div>
  );
};

export default App;
