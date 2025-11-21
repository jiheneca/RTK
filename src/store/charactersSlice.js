import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCharacters = createAsyncThunk(
  "characters/fetch",
  async () => {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    return response.json();
  }
);

const charactersSlice = createSlice({
  name: "characters",
  initialState: { list: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.results;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default charactersSlice.reducer;
