import React, { Component } from 'react';
import { FaPlay } from 'react-icons/fa';
import styled from '@emotion/styled';
import { Link } from '@reach/router';
import Trailer from './trailer';

class MovieThumbnail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTrailer: false,
      playButtonVisible: false
    };
    this.toggleTrailer = this.toggleTrailer.bind(this);
    this.togglePlayButton = this.togglePlayButton.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  toggleTrailer(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      showTrailer: !this.state.showTrailer
    });
  }

  togglePlayButton() {
    this.setState({
      playButtonVisible: !this.state.playButtonVisible
    });
  }

  handleMouseEnter() {
    this.playVisibleTimer = setTimeout(() => {
      this.setState({ playButtonVisible: true });
    }, 500);
  }

  handleMouseLeave() {
    this.clearPlayVisibleTimer();
    this.setState({ playButtonVisible: false });
  }

  clearPlayVisibleTimer() {
    if (this.playVisibleTimer) clearTimeout(this.playVisibleTimer);
  }

  componentWillUnmount() {
    this.clearPlayVisibleTimer();
  }

  render() {
    const { movie } = this.props;
    const { showTrailer, playButtonVisible } = this.state;
    return (
      <div>
        <Link className="link-normal" to={`/movie/${movie.id}`}>
          <Poster
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          >
            <img
              className="img-fluid"
              src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
              alt="Poster"
            />
            {movie.trailerKey && (
              <PosterPlay
                className={`${playButtonVisible ? 'visible' : 'invisible'}`}
              >
                <PlayButton onClick={this.toggleTrailer}>
                  <FaPlay color="white" />
                </PlayButton>
              </PosterPlay>
            )}
          </Poster>
          <div className="text-center">{movie.title}</div>
        </Link>

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

const Poster = styled('div')`
  position: relative;
  margin-bottom: 5px;
`;

const PosterPlay = styled('div')`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlayButton = styled('button')`
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  svg {
    width: 30px;
    height: 30px;
    opacity: 0.8;
  }
  &:focus {
    outline: 0;
  }

  transition: visibility 0s, opacity 0.4s linear;

  @media (min-width: 768px) {
    height: 80px;
    width: 80px;
    svg {
      height: 40px;
      width: 40px;
    }
  }
`;

export default MovieThumbnail;
