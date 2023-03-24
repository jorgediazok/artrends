export const getTrends = async () => {
  const result = await fetch("https://backend.artrends.ar/api/trends");
  return result.json();
};
