import React, { useState } from 'react';
import Login from './components/auth/Login';
import MainHub from './components/MainHub';
import { HotelProvider } from './context/HotelContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userContext, setUserContext] = useState(null);

  const handleLogin = (data) => {
    setUserContext(data);
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <HotelProvider>
      <MainHub user={userContext} onLogout={() => setIsLoggedIn(false)} />
    </HotelProvider>
  );
}

export default App;
