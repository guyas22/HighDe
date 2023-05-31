import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import SongSelection from './SongSelection';
import PlaylistCreated from './PlaylistCreated';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/select-songs" element={<SongSelection />} />
                    <Route path="/playlist-created" element={<PlaylistCreated />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
