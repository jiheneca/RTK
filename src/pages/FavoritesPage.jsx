
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFavorite, clearFavorites } from '../store/favoritesSlice';
import './FavoritesPage.css';

function FavoritesPage() {
  const dispatch = useDispatch();
  const favorites = useSelector((s) => s.favorites.favorites);

  if (favorites.length === 0) {
    return (
      <div>
        <h2>Aucun Favori</h2>
        <Link to="/">Découvrir les personnages</Link>
      </div>
    );
  }

  return (
    <div>
      <header>
        <h2>Mes Favoris ({favorites.length})</h2>
        <button onClick={() => { if (window.confirm('Supprimer tous les favoris ?')) dispatch(clearFavorites()); }}>Tout supprimer</button>
      </header>

      <div className="favorites-grid">
        {favorites.map((c) => (
          <div key={c.id} className="favorite-item">
            <Link to={`/character/${c.id}`}>
              <img src={c.image} alt={c.name} />
              <h3>{c.name}</h3>
            </Link>
            <button onClick={() => dispatch(removeFavorite(c.id))}>Retirer</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoritesPage;
