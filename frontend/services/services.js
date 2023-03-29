export const getTrends = async () => {
  const result = await fetch("https://artrends.ar/api/trends");
  return result.json();
};
