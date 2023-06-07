import React from 'react';
import { getLoginUrl } from '../utils/auth';
import './Login.css';


const CLIENT_ID = '03e50620de3c4aaea41cdd38a55fcdde';
const REDIRECT_URI = 'http://localhost:3000/callback';
const SCOPES = [
  'ugc-image-upload',
  'user-read-recently-played',
  'user-top-read',
  'user-read-playback-position',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'app-remote-control',
  'streaming',
  'playlist-modify-public',
  'playlist-modify-private',
  'playlist-read-private',
  'playlist-read-collaborative',
  'user-follow-modify',
  'user-follow-read',
  'user-library-modify',
  'user-library-read',
  'user-read-email',
  'user-read-private',
];
  

function Login() {
  const handleLogin = () => {
    window.location.href = getLoginUrl(CLIENT_ID, REDIRECT_URI, SCOPES);
  };

  return (
    <div className="login-container">
      <h1>HighDe</h1>
      <p>weee to HighDe, your personal running assistant. We create playlists for you that change with your running tempo. Just say "HighDe" for a faster tempo, or "Shwaye" for a slower one.</p>
      <button className="login-button" onClick={handleLogin}>
         <img src={process.env.PUBLIC_URL + '/icons8-spotify-3.svg'} alt="spotify logo" width="60" height="60" />
        Login to Spotify
      </button>
    </div>
  );
}

export default Login;