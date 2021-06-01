import React, { useEffect, useState } from "react";
import useProviderAuth from "../../contexts/authContext/useProviderAuth";
import { getLyrics } from "../../services/scrapper/scrapper.service";
import AuthorizationError from '../../core/errors/AuthorizeError';
import { getCurrentSong } from "../../services/spotify-service/spotify.service";

const TIMER = 60000;

const Home = () => {
  const { redirectToSpotify, user, signout } = useProviderAuth();
  const [loading, setLoading] = useState(false);
  const [song, setSong] = useState({ name: "", artistNames: "" });
  const [autoFetchEnabled, setAutoFetch] = useState(true);
  const [error, setError] = useState("");
  const [lyrics, setLyrics] = useState();
  const [text, setText] = useState({ name: '', artistNames: ''});

  const submitForm = () => {
    const { name, artistNames } = text;
    setAutoFetch(false);
    setSong({
      name,
      artistNames
    });
  }

  useEffect(() => {
    const interval = setInterval(async () => {
      if (autoFetchEnabled) {
        await getSong();
      }
    }, TIMER);
    return () => clearInterval(interval);
  }, [song.name, autoFetchEnabled])

  useEffect(() => {
    if (song.name) {
      getCurrentLyrics();
    }
  }, [song.name]);

  const getSong = async () => {
    if (!autoFetchEnabled) { setAutoFetch(true);}
    setLoading(true);
    try {
      const { error: requestError, artistNames, name } = await getCurrentSong();
      if (requestError) {
        setError(error);
        return;
      }
      if (song.name !== name) {
        setSong({
          name,
          artistNames: artistNames.join(", "),
        });
      }
    } catch (e) {
      if (e instanceof AuthorizationError) {
        console.log('redirect');
        redirectToSpotify();
      }
    } finally {
      setLoading(false);
    }
    
  };

  const getCurrentLyrics = async () => {
    try {
      setLoading(true);
      const { lyrics: currentLyrics, provider } = await getLyrics(
        song.name,
        song.artistNames
      );
      if (currentLyrics && provider) {
        setLyrics(JSON.parse(currentLyrics));
      }
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
      {user || <button onClick={getSong}>Get Current Song</button>}
      <div>
        <label>Artist</label>
        <input type="text" onChange={(t) => setText({...text, artistNames: t.target.value})} />
        <label>Song</label>
        <input type="text" onChange={(t) => setText({...text, name: t.target.value})} />
        <button onClick={submitForm}>Requset</button>
      </div>
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
