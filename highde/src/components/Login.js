import React from 'react';
import { getLoginUrl } from '../utils/auth';

const CLIENT_ID = '03e50620de3c4aaea41cdd38a55fcdde';
const REDIRECT_URI = 'http://localhost:3000/callback';
const SCOPES = ['user-read-recently-played', 'playlist-modify-private'];

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
