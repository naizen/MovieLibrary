import React from 'react';
import MoviesByCategories from '../containers/movies-by-categories';

export default function Home() {
  const categories = [
    { title: 'Now Playing', category: 'now_playing' },
    { title: 'Upcoming', category: 'upcoming' }
  ];

  return (
    <div className="container my-5">
      <MoviesByCategories categories={categories} />
    </div>
  );
}
