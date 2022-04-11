import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header';

class Feedback extends Component {
  render() {
    const { assertions, score } = this.props;
    const auxNumber = 3;
    return (
      <div>
        <Header />
        <main>
          {/* Abaixo Desafio 13 */}
          <h1
            data-testid="feedback-text"
          >
            {assertions >= auxNumber ? 'Well Done!' : 'Could be better...'}
          </h1>
          {/* Abaixo Desafio 14 */}
          <p data-testid="feedback-total-score">{score}</p>
          <p data-testid="feedback-total-question">{assertions}</p>
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
      </div>
    );
  }
}

Feedback.propTypes = ({
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
});

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps, null)(Feedback);
