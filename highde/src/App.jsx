import React, { useEffect, useState } from 'react';
import { parseAccessTokenFromUrl, parseUserIdFromAccessTokenResponse } from './utils/auth';
import Login from './components/Login';
import TopTracks from './components/TopTracks';
import Player from './components/Player';

function App() {
  const [token, setToken] = useState(null);
  const [userId,setUserId] = useState(null);
  const [page,setPage] = useState('login');
  const [playListIds, setPlaylistIds] = useState([]);

  useEffect(() => {
    const parsedToken = parseAccessTokenFromUrl();
    setToken(parsedToken);
    setUserId(null);

    if (parsedToken && !userId) {
      parseUserIdFromAccessTokenResponse(parsedToken)
        .then(parsedUserId => {
          setUserId(parsedUserId);
          setPage('toptracks')
        })
        .catch(error => {
          console.error('Error getting user id:', error);
        });
    }
    
  }, []);

  useEffect(() => {
    console.log('page: ' + page)
  }, [page]);
                                                                                                                   
  return (
    <div className="App">
      {!token && page === 'login' && <Login />}
      {token && userId && page === 'toptracks' && <TopTracks token={token} userId={userId} setPage={setPage} setPlaylistIds={setPlaylistIds}/>}
      {token && userId && page === 'player' && <Player token={token} userId={userId} setPage={setPage} playlistIds={playListIds}/>}
    </div>
  );
}

export default App;
