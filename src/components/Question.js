import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { category, questionText, correctAnswer, wrongAnswer } = this.props;
    return (
      <div>
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-text">{questionText}</p>
        <button type="button" data-testid="correct-answer">{correctAnswer}</button>
        <button
          type="button"
          // data-testid={ `wrong-answer-${index}` }
        >
          {wrongAnswer}
        </button>
      </div>
    );
  }
}

Question.propTypes = ({
  category: PropTypes.string.isRequired,
  questionText: PropTypes.string.isRequired,
  correctAnswer: PropTypes.string.isRequired,
  wrongAnswer: PropTypes.string.isRequired,
});

export default Question;
