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
  