import React, { useState } from "react";
import useProviderAuth from "../../contexts/authContext/useProviderAuth";
import { getCurrentSong } from "../../services/spotify-service/spotify.service";

const Home = () => {
  const { redirectToSpotify, user, signout } = useProviderAuth();
  const [song, setSong] = useState({ name: "", artistNames: "" });
  const [error, setError] = useState("");
  const getSong = async () => {
    const { error: requestError, artistNames, name } = await getCurrentSong();
    if (requestError) {
      setError(error);
      return;
    }
    setSong({
      name,
      artistNames: artistNames.join(', ')
    });
  }
  return (
    <div>
      <h1>Login Spotify</h1>
      {user || <button onClick={redirectToSpotify}>Signin To Spotify</button>}
      {user || <button onClick={signout}>Signout</button>}
      {user || <button onClick={getSong}>Get Song</button>}
      <div>
        <h3>{song.name}</h3>
        <h3>{song.artistNames}</h3>
      </div>
    </div>
  );
};

export default Home