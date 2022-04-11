import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from './Header';

class Feedback extends Component {
  render() {
    return (
      <main>
        <Header />
        <section>
          {/* Abaixo Desafio 15 */}
          <Link to="/">
            <button
              type="button"
              data-testid="btn-play-again"
            >
              Play Again
            </button>
          </Link>
          {/* Abaixo Desafio 16 */}
          <Link to="/ranking">
            <button
              type="button"
              data-testid="btn-ranking"
            >
              Ranking
            </button>
          </Link>
        </section>
      </main>
    );
  }
}

export default Feedback;
