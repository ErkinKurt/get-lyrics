import Axios from "axios";
import STORAGE_KEYS from "../../constants/storageKeys";
import AuthorizationError from '../../core/errors/AuthorizeError';

const spotifyAxios = Axios.create({ baseURL: "https://api.spotify.com" });

spotifyAxios.interceptors.request.use(
  (config) => {
    const accessToken = window.localStorage.getItem(STORAGE_KEYS.accessToken);
    config.headers = {
      ...config.headers,
      Authorization: "Bearer " + accessToken,
    };
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export const getCurrentSong = async () => {
  try {
    const response = await spotifyAxios.get("/v1/me/player/currently-playing");
    if (!response.data) {
      return { error: "Nothing is playing atm!" };
    }
    const {
      item: { name, artists = [] }
    } = response.data;
    const artistNames = artists.map((a) => a.name);
    return {
      artistNames,
      name,
    };
  } catch (e) {
    if (e.response.status === 401) {
      throw new AuthorizationError();
    }
  }
};

export const getUserProfile = async () => {
  try {
    const response = await spotifyAxios.get("/v1/me");
  } catch (e) {
    console.log(e);
  }
};
