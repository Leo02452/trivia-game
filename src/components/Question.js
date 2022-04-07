import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchQuestions } from '../redux/actions';
import Loading from './Loading';
import Timer from './Timer';
import '../Question.css';

class Question extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      index: 0,
      loading: true,
      correctAlt: '',
      incorrectAlt: '',
    };
  }

  componentDidMount() {
    this.fetchAux();
  }

  fetchAux = async () => {
    const { fetch, token } = this.props;
    await fetch(token);
    const { questions } = this.props;
    this.setState({ questions: questions.results, loading: false });
  }

  // https://www.horadecodar.com.br/2021/05/10/como-embaralhar-um-array-em-javascript-shuffle/
  shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  handleAnswerClick = (e) => {
    e.preventDefault();
    this.setState({
      correctAlt: 'CorrectAns',
      incorrectAlt: 'IncorrectAns',
    });
  }

  renderRandomQuestions = (object) => {
    const { isTimeFinished } = this.props;
    const { correctAlt, incorrectAlt } = this.state;
    const correctAnswer = (
      <button
        key="0"
        type="button"
        data-testid="correct-answer"
        className={ correctAlt }
        disabled={ isTimeFinished }
        onClick={ this.handleAnswerClick }
      >
        {object.correct_answer}
      </button>);
    const incorrectAnswers = object.incorrect_answers.map((answer, i) => (
      <button
        onClick={ this.handleAnswerClick }
        className={ incorrectAlt }
        key={ i + 1 }
        type="button"
        data-testid={ `wrong-answer-${i}` }
        disabled={ isTimeFinished }
      >
        { answer }
      </button>));

    const allAnswers = [correctAnswer, ...incorrectAnswers];
    const shuffledArray = this.shuffleArray(allAnswers);
    return shuffledArray.map((answer) => answer);
  }

  render() {
    const { questions, index, loading } = this.state;
    return (
      <div>
        { loading
          ? <Loading />
          : (
            <>
              <p data-testid="question-category">{questions[index].category}</p>
              <p data-testid="question-text">{questions[index].question}</p>
              <div data-testid="answer-options">
                { this.renderRandomQuestions(questions[index]) }
              </div>
              <Timer />
            </>
          ) }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
  questions: state.trivia.payload,
  isTimeFinished: state.trivia.timeout,
});

const mapDispatchToProps = (dispatch) => ({
  fetch: (token) => dispatch(fetchQuestions(token)),
});

Question.defaultProps = ({
  questions: {},
  isTimeFinished: false,
});

Question.propTypes = ({
  fetch: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  questions: PropTypes.objectOf(PropTypes.any),
  isTimeFinished: PropTypes.bool,
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
