module.exports = {
  Query: {
    movies: async (_, { category }, { dataSources }) => {
      const movies = await dataSources.movieAPI.getMovies({ category });
      return movies;
    },
    moviesByCategories: async (_, { categories }, { dataSources }) => {
      const results = await dataSources.movieAPI.getMoviesByCategories({
        categories
      });
      return results;
    },
    movie: async (_, { id }, { dataSources }) => {
      const movie = await dataSources.movieAPI.getMovie({ id });
      return movie;
    },
    searchMovies: async (_, { query }, { dataSources }) => {
      const results = await dataSources.movieAPI.searchMovies({ query });
      return results;
    }
  }
};
