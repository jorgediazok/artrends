const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.artrends.ar";

export const getTrends = async () => {
  const result = await fetch(`${API_URL}/api/trends`);
  return result.json();
};
