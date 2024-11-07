const BASE_URL = 'http://localhost:3001/favorites';

export const getFavorites = async () => {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch favorites');
  }
  return response.json();
};

export const addFavorite = async (city) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ city }),
  });
  if (!response.ok) {
    throw new Error('Failed to add favorite');
  }
  return response.json();
};

export const removeFavorite = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to remove favorite');
  }
};