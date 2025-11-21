
import React, { useState, useEffect } from 'react';
import { useSearchCharactersQuery } from '../api/rickAndMortyApi';
import CharacterCard from '../components/CharacterCard';
import './SearchPage.css';

function SearchPage() {
  const [term, setTerm] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const t = setTimeout(() => {
      if (term.length >= 3) setQuery(term);
      else setQuery(''); 
    }, 300);
    return () => clearTimeout(t);
  }, [term]);

 
  const { data, isLoading, isError } = useSearchCharactersQuery(query, { skip: query.length < 3 });

  return (
    <div>
      <h2>Recherche de personnages</h2>
      <input value={term} onChange={(e) => setTerm(e.target.value)} placeholder="Tapez au moins 3 caractères..." />
      {term.length > 0 && term.length < 3 && <p>Tapez au moins 3 caractères pour lancer la recherche</p>}

      {isLoading && <div>Recherche…</div>}
      {isError && <div>Erreur lors de la recherche</div>}

      {data?.results?.length === 0 && <div>Aucun résultat trouvé</div>}

      <div className="characters-grid">
        {data?.results?.map((c) => <CharacterCard key={c.id} character={c} />)}
      </div>
    </div>
  );
}

export default SearchPage;
