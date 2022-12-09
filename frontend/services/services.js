import axios from "axios";

export const getGoogleTrends = async () => {
  return await axios.get("http://api.artrends.ar/api/google-trends", {
    withCredentials: false,
    headers: { "Content-Type": "application/json" },
  });
};

export const getTwitterTrends = async () => {
  return await axios.get("http://api.artrends.ar/api/twitter-trends", {
    withCredentials: false,
    headers: { "Content-Type": "application/json" },
  });
};

export const getSpotifyArtistTrends = async () => {
  return await axios.get("http://api.artrends.ar/api/spotify/artist-trends", {
    withCredentials: false,
    headers: { "Content-Type": "application/json" },
  });
};

export const getSpotifySongTrends = async () => {
  return await axios.get("http://api.artrends.ar/api/spotify/song-trends", {
    withCredentials: false,
    headers: { "Content-Type": "application/json" },
  });
};

export const getSpotifyPodcastTrends = async () => {
  return await axios.get("http://api.artrends.ar/api/spotify/podcast-trends", {
    withCredentials: false,
    headers: { "Content-Type": "application/json" },
  });
};

export const getYoutubeTrends = async () => {
  return await axios.get("http://api.artrends.ar/api/youtube-trends", {
    withCredentials: false,
    headers: { "Content-Type": "application/json" },
  });
};
