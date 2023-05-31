import React, { useEffect, useState } from 'react';
import { getTopTracks, createPlaylist, addTracksToPlaylist } from '../api/spotify';
import SelectableTrack from './SelectableTrack';

const TopTracks = ({ token,userId }) => {
  const [tracks, setTracks] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);

  useEffect(() => {
    getTopTracks(token)
      .then(response => {
        setTracks(response.data.items);
      })
      .catch(error => {
        console.error(error);
      });
  }, [token]);

  const handleSelectTrack = (track) => {
    setSelectedTracks(prevTracks => {
      if (prevTracks.includes(track)) {
        return prevTracks.filter(t => t !== track);
      } else {
        return [...prevTracks, track];
      }
    });
  };

  const handleGeneratePlaylist = () => {
    const sortedTracks = [...selectedTracks].sort((a, b) => {
      // Make sure both tracks have the 'audio_features' object before accessing 'tempo'
      if (a.audio_features && b.audio_features) {
        return b.audio_features.tempo - a.audio_features.tempo;
      } else {
        // If one or both tracks don't have 'audio_features', consider them as having the same tempo
        return 0;
      }
    });
  
    const highTempoTracks = sortedTracks.slice(0, 5);
    const lowTempoTracks = sortedTracks.slice(5);
    console.log('highTempoTracks', highTempoTracks);
    console.log('lowTempoTracks', lowTempoTracks);
    // Create high tempo playlist
    createPlaylist(token, userId, 'High Tempo Playlist')
    .then(response => {
      const playlistId = response.data.id;
      const trackUris = highTempoTracks.map(track => track.uri);
      return addTracksToPlaylist(token, playlistId, trackUris);
    })
    .then(() => {
      console.log('High tempo playlist created successfully');
    })
    .catch(error => {
      console.error('Error creating high tempo playlist', error);
    });
  
    // Create low tempo playlist
    createPlaylist(token, userId, 'Low Tempo Playlist')
    .then(response => {
      const playlistId = response.data.id;
      const trackUris = lowTempoTracks.map(track => track.uri);
      return addTracksToPlaylist(token, playlistId, trackUris);
    })
    .then(() => {
      console.log('Low tempo playlist created successfully');
    })
    .catch(error => {
      console.error('Error creating low tempo playlist', error);
    });
  };
  

  return (
    <div>
      <h1>Top Tracks</h1>
      {tracks.map(track => (
        <SelectableTrack
          key={track.id}
          track={track}
          isSelected={selectedTracks.includes(track)}
          onSelect={handleSelectTrack}
        />
      ))}
      <button disabled={selectedTracks.length !== 10} onClick={handleGeneratePlaylist}>
        Generate Playlist
      </button>
    </div>
  );
};

export default TopTracks;
