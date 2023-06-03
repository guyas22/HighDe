import React, { useState } from 'react';
import PlaylistPlayer from './PlaylistPlayer';

const Player = ({ token, userId, setPage, playlistIds}) => {
//   const playlistIds = {
//     slowTempoPlaylistId: null,
//     mediumTempoPlaylistId: null,
//     fastTempoPlaylistId: null,
//   };
  // setPlaylistIds([playlistIds,playlistIds,playlistIds])

  // assume that the playlistIds are set elsewhere

  return (
    <div className="player">
      <h1>Player</h1>
      {
        <PlaylistPlayer token={token} playlistIds={playlistIds} />
      }
      {/* {playlistIds.mediumTempoPlaylistId && (
        <PlaylistPlayer token={token} playlistId={playlistIds.mediumTempoPlaylistId} />
      )}
      {playlistIds.fastTempoPlaylistId && (
        <PlaylistPlayer token={token} playlistId={playlistIds.fastTempoPlaylistId} />
      )} */}
      {/* <button onClick={() => setPage('topTracks')}>Go Back</button> */}
    </div>
  );
};

export default Player;
