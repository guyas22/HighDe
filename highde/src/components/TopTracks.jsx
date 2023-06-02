import React, { useEffect, useState } from 'react';
import {getTrackFeatures, getTopTracks, createPlaylist, addTracksToPlaylist, getRecommendations } from '../api/spotify';
import SelectableTrack from './SelectableTrack';

const TopTracks = ({ token, userId }) => {
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


  
  const getRecommendationsByTempo = async (tempoRanges, seedTracks) => {
    const response = await getRecommendations(token, seedTracks);
    const recommendations = response.data.tracks;
  
    // Fetch features for each recommended track
    const features = await Promise.all(recommendations.map(track => getTrackFeatures(token, track.id)));
    const tempos = features.map(feature => feature.data.tempo);
  
  
    return tempoRanges.map(([minTempo, maxTempo]) => {
      const filteredTracks = recommendations.filter((track, index) => {
        const tempo = tempos[index];
        return tempo >= minTempo && tempo < maxTempo;
      }).slice(0, 20);
      return filteredTracks;
    });
  };
  


  const handleGeneratePlaylist = async () => {
    if (selectedTracks.length !== 5) {
      console.error("You must select exactly 10 tracks");
      return;
    }

    const seedTracks = selectedTracks.map(track => track.id);
    

    const tempoRanges = [[60, 100], [100, 140], [140, 200]]; // Slow, medium, and fast tempo ranges (BPM)
    const tempoPlaylists = ["Slow Tempo Playlist", "Medium Tempo Playlist", "Fast Tempo Playlist"];

    const recommendedTracks = await getRecommendationsByTempo(tempoRanges, seedTracks);
    console.log(recommendedTracks)
    for (let i = 0; i < 3; i++) {
      const playlistTracks = recommendedTracks[i];

      const playlistName = tempoPlaylists[i];
      createPlaylist(token, userId, playlistName)
        .then(response => {
          const playlistId = response.data.id;
          
          const trackUris = playlistTracks.map(track => track.uri);
          return addTracksToPlaylist(token, playlistId, trackUris);
        })
        .then(() => {
          console.log(`${playlistName} created successfully`);
        })
        .catch(error => {
          console.error(`Error creating ${playlistName}`, error);
        });
    }
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
      <button disabled={selectedTracks.length !== 5} onClick={handleGeneratePlaylist}>
        Generate Playlist
      </button>
    </div>
  );
};

export default TopTracks;
