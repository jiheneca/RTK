
import React, { useState } from 'react';
import { useGetCharactersQuery } from '../api/rickAndMortyApi';
import CharacterCard from '../components/CharacterCard';
import './HomePage.css';

function HomePage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error, isFetching } = useGetCharactersQuery(page);

  if (isLoading) return <div>Chargement des personnages…</div>;
  if (isError) return <div>Erreur : {error?.message || 'Impossible de charger'}</div>;

  return (
    <div className="home-page">
      <header>
        <h2>Tous les Personnages</h2>
        <p>Page {page} {data?.info?.pages ? `sur ${data.info.pages}` : ''}</p>
      </header>

      {isFetching && <div> Mise à jour…</div>}

      <div className="characters-grid">
        {data.results.map((c) => <CharacterCard key={c.id} character={c} />)}
      </div>

      <div className="pagination">
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1 || isFetching}>Précédent</button>
        <span>Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)} disabled={!data.info.next || isFetching}>Suivant</button>
      </div>
    </div>
  );
}

export default HomePage;
