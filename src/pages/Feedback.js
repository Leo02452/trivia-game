import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';
import './Feedback.css';
import tristeza from '../assets/tristeza.gif';
import happy from '../assets/happy.gif';

class Feedback extends Component {
  render() {
    const { assertions, score } = this.props;
    const auxNumber = 3;
    return (
      <div>
        <Header />
        <main className="main-feedback">
          <div className="feedback-container">
            <h1
              data-testid="feedback-text"
            >
              {assertions >= auxNumber ? 'Well Done!' : 'Could be better...'}
            </h1>
            {assertions >= auxNumber
              ? <img className="img-feedback" alt="" src={ happy } />
              : <img className="img-feedback" alt="" src={ tristeza } />}
            <p data-testid="feedback-total-score">{`⭐ Score: ${score}`}</p>
            <p data-testid="feedback-total-question">{`✅ Corrects: ${assertions}`}</p>
          </div>
          <section className="btn-container">
            <Link to="/">
              <span
                role="img"
                className="btn-feedback"
                data-testid="btn-play-again"
                aria-label="controller"
              >
                🎮 Play Again
              </span>
            </Link>
            <Link to="/ranking">
              <span
                role="img"
                className="btn-feedback"
                data-testid="btn-ranking"
                aria-label="trophy"
              >
                🏆 Ranking
              </span>
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
