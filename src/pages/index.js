import React, { Fragment } from 'react';
import { Router } from '@reach/router';
import Navbar from '../components/navbar';
import Home from './home';
import Movie from './movie';

export default function Pages() {
  return (
    <Fragment>
      <Navbar />
      <main>
        <Router>
          <Home path="/" />
          <Movie path="movie/:movieId" />
        </Router>
      </main>
    </Fragment>
  );
}
