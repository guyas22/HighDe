import React, { useEffect, useState } from 'react';
import { parseAccessTokenFromUrl, parseUserIdFromAccessTokenResponse } from './utils/auth';
import Login from './components/Login';
import TopTracks from './components/TopTracks';

function App() {
  const [token, setToken] = useState(null);
  const [userId,setUserId] = useState(null)

  useEffect(() => {
    const parsedToken = parseAccessTokenFromUrl();
    setToken(parsedToken);

    if (parsedToken) {
      parseUserIdFromAccessTokenResponse(parsedToken)
        .then(parsedUserId => {
          setUserId(parsedUserId);
        })
        .catch(error => {
          console.error('Error getting user id:', error);
        });
    }
  }, []);
                                                                                                                   
  return (
    <div className="App">
      {!token && <Login />}
      {token && userId && <TopTracks token={token} userId={userId} />}
    </div>
  );
}

export default App;
