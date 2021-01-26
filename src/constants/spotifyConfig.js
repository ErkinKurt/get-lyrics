const SPOTIFY_CONFIG = {
  client_id: 'b86d28a60b3443a4942f0c1283498a64',
  response_type: 'token',
  redirect_uri: 'http://localhost:3000/auth-redirect',
  scopes: ['user-read-currently-playing', 'user-read-private', 'user-read-email']
};

export default SPOTIFY_CONFIG;
