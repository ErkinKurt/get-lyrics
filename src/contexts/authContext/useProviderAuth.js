import { useState } from "react";
import queryString from 'query-string';
import SPOTIFY_CONFIG from "../../constants/spotifyConfig";
import STORAGE_KEYS from "../../constants/storageKeys";
import { removeItemsFromLocalStorage, setItemsToLocalStorage } from "../../utility/storage.utility";

const useProviderAuth = () => {
  const [user, setUser] = useState(null);
  const redirectToSpotify = () => {
    const auhtUrl = 'https://accounts.spotify.com/authorize';
    const url = queryString.stringifyUrl({ url: auhtUrl, query: { ...SPOTIFY_CONFIG, scope: SPOTIFY_CONFIG.scopes.join(',') } })
    window.location = url;
  };

  const signin = async () => {
    if (window.location.hash) {
      const { access_token, token_type, expires_in } = queryString.parse(window.location.hash);
      const itemsToSet = [{
        key: STORAGE_KEYS.accessToken,
        value: access_token
      },
      {
        key: STORAGE_KEYS.expiresIn,
        value: expires_in
      },
      {
        key: STORAGE_KEYS.tokenType,
        value: token_type
      }
    ];
      setItemsToLocalStorage(itemsToSet);
      // const authUser = await getUserProfile();
      setUser('gg');
    }
  }

  const signout = () => {
    removeItemsFromLocalStorage([ STORAGE_KEYS.accessToken, STORAGE_KEYS.expiresIn, STORAGE_KEYS.tokenType ]);
    setUser(null);
  };

  return {
    user,
    signin,
    redirectToSpotify,
    signout,
  };
};

export default useProviderAuth;
