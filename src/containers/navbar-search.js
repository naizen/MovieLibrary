import React, { useState, useEffect } from 'react';
import { Link } from '@reach/router';
import { useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import NavbarSearchForm from '../components/navbar-search-form';

const GET_SEARCH = gql`
  query GetSearch($query: String) {
    searchMovies(query: $query) {
      id
      title
      posterPath
      year
    }
  }
`;

export default function NavbarSearch() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [getSearch, { loading, data }] = useLazyQuery(GET_SEARCH);

  let lastRequestTimer = null;

  useEffect(() => {
    if (data && data.searchMovies) {
      setSuggestions(data.searchMovies);
    }
  }, [loading, data]);

  const loadSuggestions = value => {
    // Cancel the previous request
    if (lastRequestTimer !== null) {
      clearTimeout(lastRequestTimer);
    }

    lastRequestTimer = setTimeout(() => {
      getSearch({
        variables: { query: value }
      });
    }, 1000);
  };

  const onChange = (event, { newValue }) => {
    setQuery(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    loadSuggestions(value);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = suggestion => {
    return suggestion.title;
  };

  const renderSuggestion = suggestion => {
    return (
      <Link to={`/movie/${suggestion.id}`} className="media link-normal">
        {suggestion.posterPath && (
          <img
            className="mr-3 suggestion-img"
            src={`https://image.tmdb.org/t/p/w342${suggestion.posterPath}`}
            alt={suggestion.title}
          />
        )}
        <div className="media-body align-self-center">
          <h5 className="mt-0 suggestion-title">
            {suggestion.title}
            <small className="year year-dark">({suggestion.year})</small>
          </h5>
        </div>
      </Link>
    );
  };

  const inputProps = {
    className: 'form-control w-100',
    name: 'query',
    placeholder: 'Search for movies',
    value: query,
    onChange
  };

  return (
    <NavbarSearchForm
      isLoading={loading}
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
}
