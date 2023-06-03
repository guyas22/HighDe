import React, { useEffect, useState } from 'react';
import './PlaylistPlayer.css';

function PlaylistPlayer({ token, playlistIds }) {
    if (!playlistIds || playlistIds.length === 0) {
    // return or handle the case where playlistIds is undefined or empty
    console.log("error in playlistIds initialization")
    }
    const playlistNames = {
        0: 'Slow Tempo Playlist',
        1: 'Medium Tempo Playlist',
        2: 'Fast Tempo Playlist',
      };

    const [currTempo, setCurrTempo] = useState(0)
    const [currentPlaylistId, setCurrentPlaylistId] = useState(playlistIds[currTempo]);
    console.log(playlistIds)

  useEffect(() => {
    console.log(currentPlaylistId)
    const script = document.createElement('script');

    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: cb => { cb(token); }
      });

      // Error handling
      player.addListener('initialization_error', ({ message }) => { console.error(message); });
      player.addListener('authentication_error', ({ message }) => { console.error(message); });
      player.addListener('account_error', ({ message }) => { console.error(message); });
      player.addListener('playback_error', ({ message }) => { console.error(message); });

      // Playback status updates
      player.addListener('player_state_changed', state => { console.log(state); });

      // Ready
      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        
        // play the playlist
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
          method: 'PUT',
          body: JSON.stringify({ context_uri: `spotify:playlist:${currentPlaylistId}` }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
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
  }, [token, currentPlaylistId]);

  const changePlaylist = (tempo) => {
    if (tempo === 'Shwaye' && currTempo > 0) {
        setCurrTempo(currTempo - 1)
        setCurrentPlaylistId(playlistIds[currTempo])
    }
    if (tempo === 'HighDe' && currTempo < 2) {
        setCurrTempo(currTempo + 1)
        setCurrentPlaylistId(playlistIds[currTempo])
    }
    console.log(currTempo)
  };

  return (
    <div className="playlist-container">
    <h1>Playing Now - {playlistNames[currTempo]}</h1>
    <div className="playlist-grid">
      <div className="playlist-button" onClick={() => changePlaylist('Shwaye')}>
        <h2>Shwaye Shwaye</h2>
      </div>
      <div className="playlist-button" onClick={() => changePlaylist('HighDe')}>
        <h2>HighDe</h2>
      </div>
    </div>
  </div>
  );
}

export default PlaylistPlayer;
