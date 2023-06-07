import React, { useEffect, useState } from 'react';
import {getTrackFeatures, getTopTracks, createPlaylist, addTracksToPlaylist, getRecommendations } from '../api/spotify';
import SelectableTrack from './SelectableTrack';
import './TopTracks.css';
const TopTracks = ({ token, userId , setPage, setPlaylistIds}) => {
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
    console.log(`Track clicked: ${track}`);  // Add this line
    setSelectedTracks(prevTracks => {
      // If the track is already selected, deselect it
      if (prevTracks.includes(track)) {
        return prevTracks.filter(t => t !== track);
      } else {
        // If there are already 5 tracks selected, do nothing
        if (prevTracks.length >= 5) {
          console.warn("Maximum of 5 tracks can be selected");
          return prevTracks;
        }
        // Otherwise, add the new track to the selection
        else {
          return [...prevTracks, track];
        }
      }
    });
  };
  



  
  const getRecommendationsByDanceability = async (danceabilityRanges, seedTracks) => {
    let allRecommendations = [];
    
    // Get recommendations for each individual seed track
    for (const seedTrack of seedTracks) {
      const response = await getRecommendations(token, [seedTrack]); // use array with single seed track
      allRecommendations.push(...response.data.tracks); // add the recommendations to our list
    }
  
    // Fetch features for each recommended track
    const features = await Promise.all(allRecommendations.map(track => getTrackFeatures(token, track.id)));
    const danceabilities = features.map(feature => feature.data.danceability);
  
    return danceabilityRanges.map(([minDanceability, maxDanceability]) => {
      const filteredTracks = allRecommendations.filter((track, index) => {
        const danceability = danceabilities[index];
        return danceability >= minDanceability && danceability < maxDanceability;
      }).slice(0, 20);
      return filteredTracks;
    });
  };

  
  


  const handleGeneratePlaylist = async () => {
    if (selectedTracks.length !== 5) {
      console.error("You must select exactly 5 tracks");
      return;
    }
  
    const seedTracks = selectedTracks.map(track => track.id);
  
    const danceabilityRanges = [[0, 0.33], [0.33, 0.66], [0.66, 1.0]]; // Low, medium, and high danceability ranges
    const danceabilityPlaylists = ["Low Danceability Playlist", "Medium Danceability Playlist", "High Danceability Playlist"];
  
    const recommendedTracks = await getRecommendationsByDanceability(danceabilityRanges, seedTracks);
    
    for (const [i, playlistTracks] of recommendedTracks.entries()) {
      const playlistName = danceabilityPlaylists[i];
  
      try {
        const playlistResponse = await createPlaylist(token, userId, playlistName);
        const playlistId = playlistResponse.data.id;
  
        setPlaylistIds(oldArray => [...oldArray, playlistId]);
  
        const trackUris = playlistTracks.map(track => track.uri);
        await addTracksToPlaylist(token, playlistId, trackUris);
        
        console.log(`${playlistName} created successfully`);
        setPage('player');
      } catch (error) {
        console.error(`Error creating ${playlistName}`, error);
      }
    }
  };

  return (
    <div className='top-tracks-container'>
      <h1>Top Tracks</h1>
      <div className='tracks-grid'>
        {tracks.map(track => (
          <SelectableTrack
            key={track.id}
            track={track}
            isSelected={selectedTracks.includes(track)}
            onSelect={handleSelectTrack}
          />
        ))}
      </div>
      <div className='generate-playlist-button'>
        <button disabled={selectedTracks.length !== 5} onClick={handleGeneratePlaylist}>
          Generate Playlist
        </button>
      </div>
    </div>
  );


};

export default TopTracks;