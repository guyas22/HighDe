import React from 'react';
import { getLoginUrl } from '../utils/auth';

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
    <button onClick={handleLogin}>
      Login to Spotify
    </button>
  );
}

export default Login;
