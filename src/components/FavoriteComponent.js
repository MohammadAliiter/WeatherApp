import React, { useState } from 'react';
import { addFavorite, removeFavorite } from '../services/favoriteService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/FavoriteComponent.module.css';

const FavoriteComponent = ({ favorites, onSelectFavorite, onFavoritesChange }) => {
  const [newFavorite, setNewFavorite] = useState('');

  const handleAddFavorite = async (e) => {
    e.preventDefault();
    if (newFavorite.trim()) {
      try {
        await addFavorite(newFavorite.trim());
        setNewFavorite('');
        onFavoritesChange();
        toast.success('City added to favorites!');
      } catch (error) {
        toast.error('Failed to add favorite.');
      }
    }
  };

  const handleRemoveFavorite = async (id) => {
    try {
      await removeFavorite(id);
      onFavoritesChange();
      toast.info('City removed from favorites.');
    } catch (error) {
      toast.error('Failed to remove favorite.');
    }
  };

  return (
    <div className={styles.favoriteComponent}>
      <ToastContainer />
      <h3 className={styles.title}>Favorite Cities</h3>
      <ul className={styles.favoriteList}>
        {favorites.map((favorite) => (
          <li key={favorite.id} className={styles.favoriteItem}>
            <button
              onClick={() => onSelectFavorite(favorite.city)}
              className={styles.favoriteButton}
            >
              {favorite.city}
            </button>
            <button
              onClick={() => handleRemoveFavorite(favorite.id)}
              className={styles.removeFavorite}
            >
              ✖
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddFavorite} className={styles.addFavoriteForm}>
        <input
          type="text"
          value={newFavorite}
          onChange={(e) => setNewFavorite(e.target.value)}
          placeholder="Add new favorite city"
          className={styles.addFavoriteInput}
        />
        <button type="submit" className={styles.addFavoriteButton}>
          Add Favorite
        </button>
      </form>
    </div>
  );
};

export default FavoriteComponent;
