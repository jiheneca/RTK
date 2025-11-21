
import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Layout.css';
function Layout() {
  const favoritesCount = useSelector((state) => state.favorites.favorites.length);
  return (
    <div className="app-layout">
      <header className="app-header">
        <h1>Rick & Morty Explorer</h1>
        <nav className="main-nav">
          <NavLink to="/" end>Accueil</NavLink>
          <NavLink to="/search">Recherche</NavLink>
          <NavLink to="/favorites">Favoris ({favoritesCount})</NavLink>
        </nav>
      </header>
      <main><Outlet /></main>
      <footer><small>Données fournies par l'API Rick and Morty</small></footer>
    </div>
  );
}

export default Layout;
