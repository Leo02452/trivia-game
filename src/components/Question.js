import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchQuestions, scoreAction, timerFinished } from '../redux/actions';
import Loading from './Loading';
import './Question.css';
// import Timer from './Timer';

class Question extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      shuffledAlternatives: [],
      index: 0,
      loading: true,
      correctAlt: '',
      incorrectAlt: '',
      timer: 30,
      isClicked: false,
    };
  }

  componentDidMount() {
    this.getQuestions();
    this.handleTimer();
  }

  handleTimer = () => {
    const oneSecond = 1000;
    this.intervalID = setInterval(() => {
      this.setState((prevState) => ({ timer: prevState.timer === 0
        ? 0 : prevState.timer - 1 }), () => {
        const { timer } = this.state;
        const { dispatchTimer } = this.props;
        if (timer === 0) {
          dispatchTimer();
          clearInterval(this.intervalID);
        }
      });
    }, oneSecond);
  }

  getQuestions = async () => {
    const { dispatchFetchQuestions, token } = this.props;
    const { index } = this.state;
    await dispatchFetchQuestions(token);
    const { propsQuestions } = this.props;
    this.setState({ questions: propsQuestions.results, loading: false }, () => {
      const { questions } = this.state;
      this.shuffleAlternatives(questions[index]);
    });
  }

  // https://www.horadecodar.com.br/2021/05/10/como-embaralhar-um-array-em-javascript-shuffle/
  shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  shuffleAlternatives = (object) => {
    let alternatives = object.incorrect_answers.map((answer) => ({
      answer,
      isCorrectAnswer: false,
      difficulty: object.difficulty,
    }));

    alternatives = [...alternatives, {
      answer: object.correct_answer,
      isCorrectAnswer: true,
      difficulty: object.difficulty }];

    const shuffledArray = this.shuffleArray(alternatives);
    this.setState({ shuffledAlternatives: shuffledArray });
  }

  calculatePoints = async (difficulty, answerTime) => {
    const { dispatchScore } = this.props;

    const standardPoint = 10;
    const hardPoint = 3;
    const mediumPoint = 2;
    const easyPoint = 1;
    let totalScore;

    switch (difficulty) {
    case 'hard':
      totalScore = (standardPoint + (answerTime * hardPoint));
      break;
    case 'medium':
      totalScore = (standardPoint + (answerTime * mediumPoint));
      break;
    case 'easy':
      totalScore = (standardPoint + (answerTime * easyPoint));
      break;
    default:
      return 0;
    }
    dispatchScore(totalScore);
  }

  handleAnswerClick = (e) => {
    e.preventDefault();
    const { target: { value, name } } = e;
    this.setState({
      correctAlt: 'CorrectAns',
      incorrectAlt: 'IncorrectAns',
      isClicked: true,
    });

    if (value === 'correct') {
      const { timer } = this.state;
      this.calculatePoints(name, timer);
    }
  }

  handleNext = () => {
    this.setState({ index: 1 });
  }

  renderAlternatives = () => {
    const { correctAlt, incorrectAlt, shuffledAlternatives } = this.state;
    const { timeout } = this.props;
    return shuffledAlternatives
      .map((alternative, i) => (
        <button
          key={ i }
          type="button"
          name={ alternative.difficulty }
          disabled={ timeout }
          className={ alternative.isCorrectAnswer
            ? correctAlt
            : incorrectAlt }
          data-testid={ alternative.isCorrectAnswer
            ? 'correct-answer' : `wrong-answer-${i}` }
          value={ alternative.isCorrectAnswer
            ? 'correct' : 'wrong' }
          onClick={ this.handleAnswerClick }
        >
          { alternative.answer }
        </button>
      ));
  }

  render() {
    const {
      questions,
      index,
      loading,
      timer,
      isClicked,
    } = this.state;

    return (
      <div>
        { loading
          ? <Loading />
          : (
            <>
              <p data-testid="question-category">{questions[index].category}</p>
              <p data-testid="question-text">{questions[index].question}</p>
              <div data-testid="answer-options">
                { this.renderAlternatives() }
              </div>
              <p>{ timer }</p>
            </>
          ) }
        {isClicked && (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.handleNext }
          >
            Next
          </button>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
  propsQuestions: state.trivia.payload,
  timeout: state.trivia.timeout,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchQuestions: (token) => dispatch(fetchQuestions(token)),
  dispatchScore: (score) => dispatch(scoreAction(score)),
  dispatchTimer: () => dispatch(timerFinished()),
});

Question.defaultProps = ({
  propsQuestions: {},
  timeout: false,
});

Question.propTypes = ({
  dispatchFetchQuestions: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  propsQuestions: PropTypes.objectOf(PropTypes.any),
  timeout: PropTypes.bool,
  dispatchScore: PropTypes.func.isRequired,
  dispatchTimer: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
