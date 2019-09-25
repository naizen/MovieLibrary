import React from 'react';
import Carousel from 'nuka-carousel';
import styled from '@emotion/styled';

const StyledCarousel = styled(Carousel)`
  .slider-list {
    cursor: default !important;
    min-height: 300px;
  }
`;

const CastMember = styled('div')`
  max-width: 150px;
  cursor: default;

  img {
    max-width: 100%;
    margin-bottom: 10px;
  }
`;

const getSlidesToShow = () => {
  let slidesToShow = 3;
  if (window.matchMedia('(min-width: 768px)').matches) {
    slidesToShow = 5;
  }
  return slidesToShow;
};

const CastCarousel = ({ cast }) => (
  <StyledCarousel
    slidesToShow={getSlidesToShow()}
    slidesToScroll={3}
    cellSpacing={20}
    renderCenterLeftControls={props => null}
    renderCenterRightControls={props => null}
    renderBottomCenterControls={() => null}
  >
    {cast.map(castMember => (
      <CastMember key={castMember.id}>
        {castMember.profilePath && (
          <img
            src={`https://image.tmdb.org/t/p/w185${castMember.profilePath}`}
            alt={castMember.name}
          />
        )}
        {castMember.name} <br />
        as <em>{castMember.character}</em>
      </CastMember>
    ))}
  </StyledCarousel>
);

export default CastCarousel;
