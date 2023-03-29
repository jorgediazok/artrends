export const getTrends = async () => {
  const result = await fetch("https://api.artrends.ar/api/trends");
  return result.json();
};
