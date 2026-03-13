import React, { useState } from 'react';
import Login from './components/Login';
import MainHub from './components/MainHub';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userContext, setUserContext] = useState(null);

  const handleLogin = (data) => {
    console.log('Logging in with:', data);
    setUserContext(data);
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <MainHub user={userContext} onLogout={() => setIsLoggedIn(false)} />
  );
}

export default App;
