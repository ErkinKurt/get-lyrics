import Axios from "axios";

const scrapperAxios = Axios.create({ baseURL: "http://localhost:3001" });

scrapperAxios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export const getLyrics = async (songName, artist) => {
    const response = await scrapperAxios.get("/scrapper", {
      params: {
        songName,
        artist,
      },
    });
    return response.data;
};
