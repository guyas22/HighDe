import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [accessToken, setAccessToken] = useState(null);
    const [userId, setUserId] = useState(null);

    const clientId = '03e50620de3c4aaea41cdd38a55fcdde';
    const redirectUri = 'https://localhost:3000';

    // Parse the query string in the URL
    const { search } = useLocation();
    const code = new URLSearchParams(search).get('code');
    console.log("f")
    
    useEffect(() => {
        // Function to get the access token and user ID
        const fetchData = async () => {
            try {
                // Exchange the code for an access token
                const response = await axios.get(`http://localhost:8888/callback?code=${code}`);
                
                setAccessToken(response.data.access_token);
                setIsLoggedIn(true);

                // Get the current user's profile information
                const userResponse = await axios.get('https://api.spotify.com/v1/me', {
                    headers: {
                        'Authorization': `Bearer ${response.data.access_token}`
                    }
                });

                setUserId(userResponse.data.id);
                console.log("heyyy", userId);

            } catch (err) {
                console.error('Failed to fetch data:', err);
            }
        };

        // Call the function if we have a code
        if (code) {
            fetchData();
        }
    }, [code]);

    const authenticate = () => {
        const scopes = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';
        window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=code&show_dialog=true`;
        console.log("hi")
    };

    return (
      
        <div>
            <h1>Welcome to HighDe!</h1>
            <p>Create playlists based on your Spotify songs, organized by tempo.</p>
            {isLoggedIn ? (
                <p>Welcome, user!</p>
            ) : (
                <button onClick={authenticate}>Login with Spotify</button>
            )}
        </div>
    );
}

export default Home;
