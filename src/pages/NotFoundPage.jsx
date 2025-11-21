
import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

function NotFoundPage() {
  return (
    <div>
      <h1>404</h1>
      <h2>Dimension Inconnue</h2>
      <p>Cette page n'existe pas dans cette dimension.</p>
      <Link to="/">Retour au portail principal</Link>
    </div>
  );
}

export default NotFoundPage;
