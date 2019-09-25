import React from 'react';
import styled from '@emotion/styled';
import { MdSearch } from 'react-icons/md';
import Autosuggest from 'react-autosuggest';
import spinner from '../assets/spinner.svg';

const SearchForm = styled('form')`
  margin-top: 1em;
  position: relative;

  @media (min-width: 992px) {
    margin-top: 0;
  }

  .form-control {
    padding-left: 42px;
  }

  .search-icon {
    position: absolute;
    left: 10px;
    top: 5px;
    opacity: 0.4;
  }

  .spinner {
    position: absolute;
    right: 2px;
    width: 32px;
    opacity: 0.8;
  }
`;

const SearchBox = styled('div')`
  width: 100%;

  .react-autosuggest__container {
    position: relative;
    width: 100%;
  }

  .form-control {
    border-radius: 2px;
    &:focus {
      outline: none;
      border-color: rgba(0, 0, 0, 0.3);
      box-shadow: none;
    }
  }

  .suggestion-title {
    font-size: 16px;
    .year {
      margin-left: 5px;
    }
  }

  .suggestion-img {
    max-width: 55px;
  }

  .react-autosuggest__input--open {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .react-autosuggest__suggestions-container {
    display: none;
  }

  .react-autosuggest__suggestions-container--open {
    display: block;
    position: absolute;
    top: 45px;
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.2);
    background-color: #fff;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    z-index: 2;
  }

  .react-autosuggest__suggestions-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  .react-autosuggest__suggestion {
    cursor: pointer;
    padding: 10px 15px;
  }

  .react-autosuggest__suggestion--highlighted {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

export default function NavbarSearchForm({
  isLoading,
  suggestions,
  onSuggestionsClearRequested,
  onSuggestionsFetchRequested,
  renderSuggestion,
  getSuggestionValue,
  inputProps
}) {
  return (
    <SearchForm className="form-inline" onSubmit={e => e.preventDefault()}>
      <SearchBox>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </SearchBox>
      <div className="search-icon">
        <MdSearch size={24} />
      </div>
      {isLoading && <img src={spinner} className="spinner" alt="Loading" />}
    </SearchForm>
  );
}
