import React from 'react';
import Carousel from 'nuka-carousel';
import MovieThumbnail from './movie-thumbnail';
import CarouselNextButton from './carousel-next-button';
import CarouselPrevButton from './carousel-prev-button';

const getSlidesToShow = () => {
  let slidesToShow = 3;
  if (window.matchMedia('(min-width: 768px)').matches) {
    slidesToShow = 5;
  }
  return slidesToShow;
};

export default function MovieCarousel({ movies }) {
  return (
    <Carousel
      slidesToShow={getSlidesToShow()}
      slidesToScroll={3}
      cellSpacing={20}
      renderCenterLeftControls={props => <CarouselPrevButton {...props} />}
      renderCenterRightControls={props => <CarouselNextButton {...props} />}
      renderBottomCenterControls={() => {}}
    >
      {movies.map(movie => (
        <MovieThumbnail movie={movie} key={movie.id} />
      ))}
    </Carousel>
  );
}
