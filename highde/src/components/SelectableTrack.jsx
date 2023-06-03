const SelectableTrack = ({ track, isSelected, onSelect }) => {
  const handleClick = () => {
    console.log(`Track clicked: ${track.name}`);  // Add this line
    onSelect(track);
  };

  const imageUrl = track.album.images[0].url;
  
  return (
    <div 
      className={`track-card ${isSelected ? 'selected' : ''}`}
      style={{ backgroundImage: `url(${imageUrl})` }}
      onClick={handleClick}
    >
      <h2>{track.name}</h2>
      <p>{track.artists[0].name}</p>
    </div>
  );
};

export default SelectableTrack;
