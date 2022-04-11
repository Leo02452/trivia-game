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
    };
  }

  componentDidMount() {
    this.fetchAux();
    // this.shuffleAlternatives();
    this.timer();
  }

  componentDidUpdate(prevProps, prevState) {
    const { correctAlt } = this.state;
    if (prevState.correctAlt !== correctAlt) {
      this.setClassName();
    }
  }

  setClassName = () => {
    const { shuffledAlternatives } = this.state;
    // correctAlt, incorrectAlt,
    const newArray = shuffledAlternatives.map((alternative) => {
      if (alternative.props.value === 'correct') {
        console.log(alternative);
        // alternative.props.className = correctAlt;
        return alternative;
      }
      if (alternative.props.value === 'incorrect') {
        // alternative.props.className = incorrectAlt;
        return alternative;
      }
      return alternative;
    });
    this.setState({ shuffledAlternatives: newArray });
  }

  timer = () => {
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

  fetchAux = async () => {
    const { fetch, token } = this.props;
    const { index } = this.state;
    await fetch(token);
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

  calculatePoints = async (difficulty, answerTimer) => {
    const { score } = this.props;

    const standardPoint = 10;
    const hardPoint = 3;
    const mediumPoint = 2;
    const easyPoint = 1;
    let totalScore;

    switch (difficulty) {
    case 'hard':
      // console.log(answerTimer);
      totalScore = (standardPoint + (answerTimer * hardPoint));
      break;
    case 'medium':
      // console.log(answerTimer);
      totalScore = (standardPoint + (answerTimer * mediumPoint));
      break;
    case 'easy':
      // console.log(answerTimer);
      totalScore = (standardPoint + (answerTimer * easyPoint));
      break;
    default:
      return 0;
    }
    score(totalScore);
  }

  handleAnswerClick = (e) => {
    e.preventDefault();
    const { target: { value, name } } = e;
    this.setState({
      correctAlt: 'CorrectAns',
      incorrectAlt: 'IncorrectAns',
    });

    if (value === 'correct') {
      const { timer } = this.state;
      this.calculatePoints(name, timer);
    }
  }

  shuffleAlternatives = (object) => {
    const { timeout } = this.props;
    const { correctAlt, incorrectAlt } = this.state;
    const correctAnswer = (
      <button
        key="0"
        type="button"
        data-testid="correct-answer"
        value="correct"
        name={ object.difficulty }
        className={ correctAlt }
        disabled={ timeout }
        onClick={ this.handleAnswerClick }
      >
        {object.correct_answer}
      </button>);
    const incorrectAnswers = object.incorrect_answers.map((answer, i) => (
      <button
        onClick={ this.handleAnswerClick }
        className={ incorrectAlt }
        key={ i + 1 }
        value="incorrect"
        type="button"
        data-testid={ `wrong-answer-${i}` }
        disabled={ timeout }
      >
        { answer }
      </button>));

    const allAnswers = [correctAnswer, ...incorrectAnswers];
    const shuffledArray = this.shuffleArray(allAnswers);
    this.setState({ shuffledAlternatives: shuffledArray });
  }

  render() {
    const { questions, index, loading, shuffledAlternatives, timer } = this.state;
    return (
      <div>
        { loading
          ? <Loading />
          : (
            <>
              <p data-testid="question-category">{questions[index].category}</p>
              <p data-testid="question-text">{questions[index].question}</p>
              <div data-testid="answer-options">
                { shuffledAlternatives.map((answer) => answer) }
              </div>
              <p>{ timer }</p>
            </>
          ) }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
  propsQuestions: state.trivia.payload,
  timeout: state.trivia.timeout,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  fetch: (token) => dispatch(fetchQuestions(token)),
  score: (score) => dispatch(scoreAction(score)),
  dispatchTimer: () => dispatch(timerFinished()),
});

Question.defaultProps = ({
  propsQuestions: {},
  timeout: false,
});

Question.propTypes = ({
  fetch: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  propsQuestions: PropTypes.objectOf(PropTypes.any),
  timeout: PropTypes.bool,
  score: PropTypes.func.isRequired,
  dispatchTimer: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
