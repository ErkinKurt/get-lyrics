import React, { useState } from "react";
import useProviderAuth from "../../contexts/authContext/useProviderAuth";
import { getLyrics } from "../../services/scrapper/scrapper.service";
import { getCurrentSong } from "../../services/spotify-service/spotify.service";

const Home = () => {
  const { redirectToSpotify, user, signout } = useProviderAuth();
  const [loading, setLoading] = useState(false);
  const [song, setSong] = useState({ name: "", artistNames: "" });
  const [error, setError] = useState("");
  const [lyrics, setLyrics] = useState();

  const getSong = async () => {
    setLoading(true);
    const { error: requestError, artistNames, name } = await getCurrentSong();
    if (requestError) {
      setError(error);
      return;
    }
    if (song.name !== name) {
      setLyrics("");
    }
    setSong({
      name,
      artistNames: artistNames.join(", "),
    });
    setLoading(false);
  };

  const getCurrentLyrics = async () => {
    try {
      setLoading(true);
      const { lyrics: currentLyrics, provider } = await getLyrics(
        song.name,
        song.artistNames
      );
      setLyrics(JSON.parse(currentLyrics));
      setLoading(false);
    } catch (e) {
      console.log(e);
      setError(`Couldn't scrap`);
      setLoading(false);
    }
  };

  return (
    <div style={{ margin: 20 }}>
      <h1>Login Spotify</h1>
      {user || <button onClick={redirectToSpotify}>Signin To Spotify</button>}
      {user || <button onClick={signout}>Signout</button>}
      {user || <button onClick={getSong}>Get Song</button>}
      {user || <button onClick={getCurrentLyrics}>Get Current Lyrics</button>}
      <div>
        <h3>{song.name}</h3>
        <h3>{song.artistNames}</h3>
      </div>
      {loading ? (
        <p>Loading</p>
      ) : (
        <div style={{ whiteSpace: "pre-wrap" }}>{lyrics}</div>
      )}
    </div>
  );
};

export default Home;
