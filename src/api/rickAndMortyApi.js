import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rickAndMortyApi = createApi({
  reducerPath: 'rickAndMortyApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api' }),
  tagTypes: ['Character'],
  endpoints: (builder) => ({
    getCharacters: builder.query({
      query: (page = 1) => `/character?page=${page}`,
      providesTags: ['Character'],
    }),
    getCharacterById: builder.query({
      query: (id) => `/character/${id}`,
      providesTags: (result, error, id) => [{ type: 'Character', id }],
    }),
    searchCharacters: builder.query({
      query: (name) => `/character?name=${name}`,
      providesTags: ['Character'],
    }),
    getMultipleCharacters: builder.query({
      query: (ids) => `/character/${ids.join(',')}`,
      providesTags: ['Character'],
    }),
  }),
});

export const {
  useGetCharactersQuery,
  useGetCharacterByIdQuery,
  useSearchCharactersQuery,
  useGetMultipleCharactersQuery,
  usePrefetch,
} = rickAndMortyApi;
