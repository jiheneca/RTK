
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetCharacterByIdQuery } from '../api/rickAndMortyApi';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../store/favoritesSlice';
import './CharacterDetailPage.css';

function CharacterDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: character, isLoading, isError } = useGetCharacterByIdQuery(id);
  const favorites = useSelector((s) => s.favorites.favorites);
  const isFavorite = character && favorites.some((f) => f.id === character.id);

  if (isLoading) return <div>Chargement du personnage…</div>;
  if (isError || !character) {
    return (
      <div>
        <h2>Personnage introuvable</h2>
        <button onClick={() => navigate('/')}>Retour</button>
      </div>
    );
  }

  return (
    <div className="character-detail-page">
      <button onClick={() => navigate(-1)}>Retour</button>
      <div className="detail-container">
        <img src={character.image} alt={character.name} />
        <div>
          <h1>{character.name}</h1>
          <p>{character.status}</p>
          <button onClick={() => dispatch(toggleFavorite(character))}>
            {isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          </button>
          <section>
            <h3>Informations générales</h3>
            <dl>
              <dt>Espèce</dt><dd>{character.species}</dd>
              <dt>Genre</dt><dd>{character.gender}</dd>
              <dt>Origine</dt><dd>{character.origin.name}</dd>
              <dt>Dernière localisation</dt><dd>{character.location.name}</dd>
            </dl>
          </section>
        </div>
      </div>
    </div>
  );
}

export default CharacterDetailPage;
