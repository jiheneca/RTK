
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../store/favoritesSlice';
import { rickAndMortyApi } from '../api/rickAndMortyApi';
import './CharacterCard.css';

function CharacterCard({ character }) {
  const dispatch = useDispatch();
  const favorites = useSelector((s) => s.favorites.favorites);
  const isFavorite = favorites.some((f) => f.id === character.id);

 
  const prefetch = rickAndMortyApi.usePrefetch('getCharacterById');

  const handleToggle = (e) => {
    e.preventDefault(); 
    dispatch(toggleFavorite(character));
  };

  return (
    <Link
      to={`/character/${character.id}`}
      onMouseEnter={() => prefetch(character.id, { ifOlderThan: 60 })} 
      className="character-card-link"
    >
      <article className="character-card">
        <img src={character.image} alt={character.name} />
        <div className="card-content">
          <h3>{character.name}</h3>
          <p>{character.status} - {character.species}</p>
          <button onClick={handleToggle} className={`btn-fav ${isFavorite ? 'active' : ''}`}>
            {isFavorite ? '♥' : '♡'}
          </button>
        </div>
      </article>
    </Link>
  );
}

export default CharacterCard;
