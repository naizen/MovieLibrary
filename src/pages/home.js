import React from 'react';
import MoviesByCategories from '../containers/movies-by-categories';

export default function Home() {
  const categories = [
    { title: 'Now Playing', category: 'now_playing' },
    { title: 'Upcoming', category: 'upcoming' },
    { title: 'Popular', category: 'popular' }
  ];

  return (
    <div className="container my-5">
      <MoviesByCategories categories={categories.slice(0, 2)} />
      <MoviesByCategories categories={categories.slice(2, 3)} />
    </div>
  );
}
