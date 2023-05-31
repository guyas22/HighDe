// src/components/RecentlyPlayed.js

import React, { useEffect, useState } from 'react';
import { getRecentlyPlayedTracks, getCurrentUserProfile, createPlaylist, addTracksToPlaylist } from '../api/spotify';

const RecentlyPlayed = ({ token }) => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    getRecentlyPlayedTracks(token)
      .then(response => {
        setTracks(response.data.items);
      })
      .catch(error => {
        console.error(error);
      });
  }, [token]);

  const handleGeneratePlaylist = () => {
    getCurrentUserProfile(token)
      .then(response => {
        const userId = response.data.id;
        return createPlaylist(token, userId, 'HighDe Playlist');
      })
      .then(response => {
        const playlistId = response.data.id;
        const uris = tracks.map(track => track.track.uri);
        return addTracksToPlaylist(token, playlistId, uris);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Recently Played Tracks</h1>
      {tracks.map((item, index) => (
        <p key={index}>{item.track.name}</p>
      ))}
      <button onClick={handleGeneratePlaylist}>
        Generate Playlist
      </button>
    </div>
  );
}

export default RecentlyPlayed;
