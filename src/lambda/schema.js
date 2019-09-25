const { gql } = require('apollo-server-lambda');

const typeDefs = gql`
  type Query {
    movies(category: String): [Movie]
    moviesByCategories(categories: [String]): [MoviesByCategories]
    movie(id: ID!): Movie
    searchMovies(query: String): [Movie]
  }

  type Movie {
    id: ID!
    title: String
    year: Int
    slug: String
    posterPath: String
    backdropPath: String
    tagline: String
    overview: String
    releaseDate: String
    runtime: Int
    trailerKey: String
    certification: String
    voteCount: Int
    voteAvg: Float
    imdbId: String
    cast: [Cast]
    crew: [Crew]
  }

  type MoviesByCategories {
    category: String
    movies: [Movie]
  }

  type Cast {
    id: ID!
    character: String
    name: String
    profilePath: String
  }

  type Crew {
    id: ID!
    department: String
    job: String
    name: String
    profilePath: String
  }
`;

module.exports = typeDefs;
