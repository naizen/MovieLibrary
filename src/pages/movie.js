import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import MovieDetail from '../components/movie-detail';

const GET_MOVIE = gql`
  query GetMovie($id: ID!) {
    movie(id: $id) {
      id
      title
      posterPath
      backdropPath
      trailerKey
      overview
      releaseDate
      voteAvg
      cast {
        id
        name
        character
        profilePath
      }
      crew {
        id
        name
        department
        job
      }
    }
  }
`;

export default function Movie({ movieId }) {
  const { data, loading, error } = useQuery(GET_MOVIE, {
    variables: { id: movieId }
  });

  if (error) return <p>ERROR</p>;

  return <MovieDetail data={data} loading={loading} />;
}
