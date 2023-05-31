import React from 'react';

function Home() {
    const authenticate = () => {
        const clientId = '03e50620de3c4aaea41cdd38a55fcdde';
        const redirectUri = 'http://localhost:3000'; // replace with the redirect URI you set up in your Spotify application
        const scopes = 'user-read-private user-read-email'; // replace with the scopes your app needs

        window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=code&show_dialog=true`;
    };

    return (
        <div>
            <h1>Welcome to HighDe!</h1>
            <p>Create playlists based on your Spotify songs, organized by tempo.</p>
            <button onClick={authenticate}>Login with Spotify</button>
        </div>
    );
}

export default Home;



const clientId = '03e50620de3c4aaea41cdd38a55fcdde';
const redirectUri = 'http://localhost:3000'; // replace with the redirect URI you set up in your Spotify application