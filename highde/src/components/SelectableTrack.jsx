import React from 'react';

const SelectableTrack = ({ track, isSelected, onSelect }) => {
  const handleSelect = () => {
    onSelect(track);
  };

  return (
    <div>
      <input type="checkbox" checked={isSelected} onChange={handleSelect} />
      {track.name}
    </div>
  );
};

export default SelectableTrack;