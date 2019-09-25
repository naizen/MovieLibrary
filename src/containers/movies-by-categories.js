import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import MovieCarousel from '../components/movie-carousel';

const GET_MOVIES_BY_CATEGORIES = gql`
  query GetMoviesByCategories($categories: [String]) {
    moviesByCategories(categories: $categories) {
      category
      movies {
        id
        title
        trailerKey
        posterPath
      }
    }
  }
`;

export default function MoviesByCategories({ categories }) {
  const { loading, error, data } = useQuery(GET_MOVIES_BY_CATEGORIES, {
    variables: { categories: categories.map(c => c.category) }
  });

  let categoryMap = {};

  if (loading) return <PlaceholderLoader rows={categories.map((_, i) => i)} />;
  if (error) return <p>ERROR</p>;

  if (data && data.moviesByCategories) {
    data.moviesByCategories.forEach(item => {
      categoryMap[item.category] = item.movies;
    });
  }

  return (
    <div>
      {categories.map(category => (
        <div key={category.category}>
          <h4 className="mb-4">{category.title}</h4>
          <MovieCarousel movies={categoryMap[category.category]} />
        </div>
      ))}
    </div>
  );
}

const PlaceholderLoader = ({ rows }) => (
  <Fragment>
    {rows.map(r => (
      <div key={r}>
        <h4>&nbsp;</h4>
        <div className="row ph-carousel">
          <div className="col-4 col-md">
            <div className="ph-item">
              <div className="ph-picture" />
            </div>
          </div>
          <div className="col-4 col-md">
            <div className="ph-item">
              <div className="ph-picture" />
            </div>
          </div>
          <div className="col-4 col-md">
            <div className="ph-item">
              <div className="ph-picture" />
            </div>
          </div>
          <div className="d-none d-md-block col-md">
            <div className="ph-item">
              <div className="ph-picture" />
            </div>
          </div>
          <div className="d-none d-md-block col-md">
            <div className="ph-item">
              <div className="ph-picture" />
            </div>
          </div>
        </div>
      </div>
    ))}
  </Fragment>
);
