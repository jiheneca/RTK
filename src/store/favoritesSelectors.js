import { createSelector } from "reselect";


const selectFavoritesState = (state) => state.favorites.favorites;


export const selectFavoritesCount = createSelector(
  [selectFavoritesState],
  (favorites) => favorites.length
);

export const makeSelectIsFavorite = () =>
  createSelector(
    [selectFavoritesState, (state, characterId) => characterId],
    (favorites, characterId) => favorites.some((fav) => fav.id === characterId)
  );


export const selectFavorites = selectFavoritesState;
