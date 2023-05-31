const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
// const cors = require('cors');
const app = express();
// app.use(cors());
const clientId = '03e50620de3c4aaea41cdd38a55fcdde'; // replace with your client id
const clientSecret = '1b4a1747832840bd83abd7f119a9b9bf'; // replace with your client secret
const redirectUri = 'http://localhost:3000'; // replace with your redirect uri
console.log("hello");
app.get('/callback', async (req, res) => {
    const code = req.query.code;

    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
            grant_type: 'authorization_code',
            code,
            redirect_uri: redirectUri,
            client_id: clientId,
            client_secret: clientSecret,
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        // response.data will contain the access token and refresh token
        // you should save these in your database associated with the user
        console.log(response.data);

        // redirect to your react app
        res.redirect(`http://localhost:3000/select-songs?access_token=${response.data.access_token}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to exchange code for access token');
    }
});

app.listen(8888, () => console.log('Server started on port 8888'));
