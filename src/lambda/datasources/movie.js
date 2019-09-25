const { RESTDataSource } = require('apollo-datasource-rest');

class MovieAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.themoviedb.org/3/';
  }

  willSendRequest(request) {
    request.params.set('api_key', process.env.TMDB_API_KEY);
  }

  movieReducer(movie) {
    const year = movie.release_date
      ? parseInt(movie.release_date.substr(0, 4))
      : null;

    let trailerKey = '';

    if (movie.hasOwnProperty('videos')) {
      const youtubeTrailer = movie.videos.results.filter(
        v => v.type === 'Trailer' && v.site === 'YouTube'
      );
      trailerKey = youtubeTrailer.length > 0 ? youtubeTrailer[0].key : '';
    }

    let cast,
      crew = [];

    if (movie.hasOwnProperty('credits')) {
      cast = movie.credits.cast.map(c => ({
        id: c.id,
        character: c.character,
        name: c.name,
        profilePath: c.profile_path
      }));
      crew = movie.credits.crew.map(c => ({
        id: c.id,
        department: c.department,
        job: c.job,
        name: c.name,
        profilePath: c.profile_path
      }));
    }

    return {
      id: movie.id,
      title: movie.title,
      year,
      releaseDate: movie.release_date,
      posterPath: movie.poster_path,
      backdropPath: movie.backdrop_path,
      overview: movie.overview,
      tagline: movie.tagline,
      imdbId: movie.imdb_id,
      trailerKey,
      runtime: movie.runtime,
      certification: movie.certification,
      voteCount: movie.vote_count,
      voteAvg: movie.vote_average,
      cast,
      crew
    };
  }

  async getMovies({ category }) {
    const res = await this.get(`movie/${category}`);
    return Promise.all(
      res.results.map(movie => this.getMovie({ id: movie.id }))
    );
  }

  async getMoviesByCategories({ categories }) {
    return Promise.all(
      categories.map(category => ({
        category,
        movies: this.getMovies({ category })
      }))
    );
  }

  async getMovie({ id }) {
    const res = await this.get(`movie/${id}`, {
      append_to_response: 'videos,credits'
    });
    const movie = this.movieReducer(res);
    return movie;
  }

  async searchMovies({ query }) {
    const res = await this.get('search/movie', { query });
    const movies = res.results.map(m => this.movieReducer(m));
    return movies;
  }
}

module.exports = MovieAPI;
