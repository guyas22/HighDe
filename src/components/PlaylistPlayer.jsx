import React, { useState, useEffect } from 'react';
import './PlaylistPlayer.css'

const PlaylistPlayer = ({ token, playlistIds = [] }) => {
  const [playlistIndex, setPlaylistIndex] = useState(0);
  const [playlistName, setPlaylistName] = useState('');
  const [deviceId, setDeviceId] = useState(null);
  let first_time = true

  useEffect(() => {
    const script = document.createElement('script');

    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: cb => { cb(token); }
      });

      // Ready
      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        setDeviceId(device_id);
        switchPlaylist(0);
      });

      // Not Ready
      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      player.connect();
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [token]);

  const getPlaylistName = async (playlistId) => {
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    const data = await response.json();
    setPlaylistName(data.name);
  };

  const playPlaylist = async (playlistId) => {
    if (!deviceId) {
      console.error('No device id available');
      return;
    }
    await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
      method: 'PUT',
      body: JSON.stringify({ context_uri: `spotify:playlist:${playlistId}` }),
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    });
  };

  const switchPlaylist = (delta) => {
    setPlaylistIndex(prevIndex => {
      const newIndex = prevIndex + delta;

      if (newIndex < 0 || newIndex >= playlistIds.length) return prevIndex;  // Out of bounds

      getPlaylistName(playlistIds[newIndex]);
      playPlaylist(playlistIds[newIndex]);

      return newIndex;
    });
  };
 

  return (
    <div className="playlist-container">
      <h1>Playlist Player</h1>
      <div className="playlist-grid">
        <button className="playlist-button" onClick={() => switchPlaylist(-1)}>
          Shwaye Shwaye
        </button>
        <button className="playlist-button" onClick={() => switchPlaylist(1)}>
          HighDe HighDe
        </button>
      </div>
      <p>Currently playing: {playlistName}</p>
    </div>
  );
};

export default PlaylistPlayer;
