// src/App.js

import React, { useEffect, useState } from 'react';
import { parseAccessTokenFromUrl } from './utils/auth';
import Login from './components/Login';
import RecentlyPlayed from './components/RecentlyPlayed';

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const parsedToken = parseAccessTokenFromUrl();
    setToken(parsedToken);
  }, []);

  return (
    <div className="App">
      {!token && <Login />}
      {token && <RecentlyPlayed token={token} />}
    </div>
  );
}

export default App;
