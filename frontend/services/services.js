export const getGoogleTrends = async () => {
  const result = await fetch("http://api.artrends.ar/api/google-trends");
  return result.json();
};

export const getTwitterTrends = async () => {
  const result = await fetch("http://api.artrends.ar/api/twitter-trends");
  return result.json();
};

export const getSpotifyArtistTrends = async () => {
  const result = await fetch(
    "http://api.artrends.ar/api/spotify/artist-trends"
  );
  return result.json();
};

export const getSpotifySongTrends = async () => {
  const result = await fetch("http://api.artrends.ar/api/spotify/song-trends");
  return result.json();
};

export const getSpotifyPodcastTrends = async () => {
  const result = await fetch(
    "http://api.artrends.ar/api/spotify/podcast-trends"
  );
  return result.json();
};

export const getYoutubeTrends = async () => {
  const result = await fetch("http://api.artrends.ar/api/youtube-trends");
  return result.json();
};

export const getPortals = async () => {
  const result = await fetch("http://api.artrends.ar/api/portals");
  return result.json();
};
