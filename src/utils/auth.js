import axios from 'axios';

export async function parseUserIdFromAccessTokenResponse(accessToken) {
  try {
    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.id;
  } catch (error) {
    console.error('Error retrieving user ID', error);
    return null;
  }
}

export function getLoginUrl(clientId, redirectUri, scopes = []) {
  const AUTHORIZE_URL = "https://accounts.spotify.com/authorize";
  const scopeParam = scopes.join("%20");
  
  return `${AUTHORIZE_URL}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopeParam}&response_type=token&show_dialog=true`;
}

export function parseAccessTokenFromUrl() {
  if (window.location.hash) {
    const { access_token } = Object.fromEntries(new URLSearchParams(window.location.hash.substr(1)));
    return access_token;
  }
  return null;
}
