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
          <h1
            data-testid="feedback-text"
          >
            {assertions >= auxNumber ? 'Well Done!' : 'Could be better...'}
          </h1>
          <p data-testid="feedback-total-score">{score}</p>
          <p data-testid="feedback-total-question">{assertions}</p>
          <section>
            <Link to="/">
              <button
                type="button"
                data-testid="btn-play-again"
              >
                Play Again
              </button>
            </Link>
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
