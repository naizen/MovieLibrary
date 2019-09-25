import React, { Component } from 'react';
import { FaStar, FaPlay } from 'react-icons/fa';
import styled from '@emotion/styled';
import Trailer from '../components/trailer';
import CastCarousel from './cast-carousel';
import { formatDate, shadows } from '../utils';

class MovieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTrailer: false
    };
    this.toggleTrailer = this.toggleTrailer.bind(this);
  }

  toggleTrailer(e) {
    this.setState({
      showTrailer: !this.state.showTrailer
    });
  }

  render() {
    const { movie } = this.props;
    const { showTrailer } = this.state;

    let style = {};
    if (movie.backdropPath) {
      style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movie.backdropPath})`;
    }

    let directors,
      writers = [];
    if (movie.crew) {
      directors = movie.crew.filter(c => c.department === 'Directing');
      writers = movie.crew.filter(c => c.department === 'Writing');
    }

    return (
      <div>
        <Backdrop className="jumbotron" style={style}>
          <div className="container">
            <div className="row">
              <div className="col-4 col-md-3">
                <Poster
                  src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                  alt={movie.title}
                />
              </div>
              <div className="col-8 col-md-8 align-self-end">
                <Title>
                  {movie.title}
                  {movie.year && <small className="year">({movie.year})</small>}
                </Title>
                <div className="ratings">
                  {movie.voteAvg > 0 && (
                    <div className="rating" data-tip="TMDB Vote Average">
                      <FaStar size={20} color="#f5de50" />
                      <span className="rating-num">
                        {movie.voteAvg.toFixed(1)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="container">
                  <Actions className="row">
                    <div className="col-xs-12">
                      {movie.trailerKey ? (
                        <button
                          onClick={this.toggleTrailer}
                          type="button"
                          className="btn btn-light"
                        >
                          <FaPlay /> Watch Trailer
                        </button>
                      ) : (
                        <p className="lead text-muted">No trailer yet</p>
                      )}
                    </div>
                  </Actions>
                </div>
              </div>
            </div>
          </div>
        </Backdrop>
        <div className="container">
          <div className="row">
            <div className="col col-lg-3" />
            <div className="col-lg-8">
              <p className="lead mb-4">{movie.overview}</p>
              <p className="mb-1">
                <strong>Directed by:</strong>{' '}
                {directors
                  .slice(0, 2)
                  .map(d => d.name)
                  .join(', ')}
              </p>
              <p className="mb-1">
                <strong>Starring:</strong>{' '}
                {movie.cast
                  .slice(0, 4)
                  .map(c => c.name)
                  .join(', ')}
              </p>
              <p className="mb-1">
                <strong>Written by:</strong>{' '}
                {writers
                  .slice(0, 2)
                  .map(w => w.name)
                  .join(', ')}
              </p>
              <p className="mb-1">
                <strong>Released:</strong> {formatDate(movie.releaseDate)}
              </p>
              {movie.runtime && (
                <p className="mb-1">
                  <strong>Runtime:</strong> {movie.runtime}
                </p>
              )}
              {/* <p className="mb-1">
                <strong>Genres:</strong>{' '}
                {movie.genres.map(g => g.name).join(', ')}
              </p> */}

              <h3 className="mt-5">Cast</h3>
              <hr />
              <CastCarousel cast={movie.cast} />
            </div>
          </div>
        </div>
        {movie.trailerKey && (
          <Trailer
            show={showTrailer}
            videoSrc={`https://www.youtube.com/embed/${movie.trailerKey}`}
            toggleTrailer={this.toggleTrailer}
          />
        )}
      </div>
    );
  }
}

const Backdrop = styled('div')`
  border-radius: 1px;
  position: relative;
  padding-bottom: 1rem;
  margin-bottom: 1rem;

  /* Parallax Effect */
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position: 50% 10%;
  background-size: cover;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
  }
  @media (min-width: 992px) {
    padding-top: 20rem;
  }
`;

const Poster = styled('img')`
  box-shadow: ${shadows['8']};
  width: 100%;
  max-width: 200px;
  @media (min-width: 768px) {
    position: absolute;
    max-width: 150px;
  }
  @media (min-width: 992px) {
    max-width: 200px;
  }
  @media (min-width: 1200px) {
    max-width: 250px;
  }
`;

const Title = styled('h1')`
  color: rgba(255, 255, 255, 0.9);
  font-weight: 400;
  font-size: 25px;

  @media (min-width: 768px) {
    font-size: 40px;
  }
`;

const Actions = styled('div')`
  margin-top: 2em;
  color: rgba(255, 255, 255, 0.9);

  .text-muted {
    color: rgba(255, 255, 255, 0.8) !important;
  }

  .btn {
    background: transparent;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 1em;
    svg {
      height: 24px;
      width: 24px;
      margin-right: 5px;
      color: rgba(255, 255, 255, 0.9);
    }
    &:hover {
      svg {
        color: rgba(255, 255, 255, 1);
      }
    }
  }
`;

export default MovieDetail;
