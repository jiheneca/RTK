import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  favorites: [], 
};


const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
 
    addFavorite: (state, action) => {
      const exists = state.favorites.find(
        (fav) => fav.id === action.payload.id
      );
      if (!exists) {
        state.favorites.push(action.payload);
      }
    },

   
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (fav) => fav.id !== action.payload
      );
    },

    
    toggleFavorite: (state, action) => {
      const index = state.favorites.findIndex(
        (fav) => fav.id === action.payload.id
      );
      if (index !== -1) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(action.payload);
      }
    },

  
    clearFavorites: (state) => {
      state.favorites = [];
    },
  },
});


export const {
  addFavorite,
  removeFavorite,
  toggleFavorite,
  clearFavorites
} = favoritesSlice.actions;


export default favoritesSlice.reducer;
