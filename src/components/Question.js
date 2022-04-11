import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
<<<<<<< HEAD
import { fetchQuestions, scoreAction, timerFinished } from '../redux/actions';
import Loading from './Loading';
// import Timer from './Timer';
import '../Question.css';
=======
import '../Question.css';
import { fetchQuestions, scoreAction } from '../redux/actions';
import Loading from './Loading';
import Timer from './Timer';
>>>>>>> 3e79abf0957e0ecafc2604a8f00e919f791094a5

class Question extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      index: 0,
      loading: true,
      correctAlt: '',
      incorrectAlt: '',
<<<<<<< HEAD
      timer: 30,
=======
      answerTimer: '',
      test: false,
>>>>>>> 3e79abf0957e0ecafc2604a8f00e919f791094a5
    };
  }

  componentDidMount() {
    this.fetchAux();
    // this.renderRandomQuestions();
    this.timer();
  }

<<<<<<< HEAD
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  timer = () => {
    const oneSecond = 1000;
    this.intervalID = setInterval(() => {
      this.setState((prevState) => ({ timer: prevState.timer === 0
        ? 0 : prevState.timer - 1 }), () => {
        const { timer } = this.state;
        const { dispatchTimer } = this.props;
        if (timer === 0) { dispatchTimer(); }
      });
    }, oneSecond);
  }
=======
  getTimer = (timer) => this.setState({ answerTimer: timer });
>>>>>>> 3e79abf0957e0ecafc2604a8f00e919f791094a5

  fetchAux = async () => {
    const { fetch, token } = this.props;
    const { index } = this.state;
    await fetch(token);
    const { questions } = this.props;
    this.setState({ loading: false });
    this.renderRandomQuestions(questions.results[index]);
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
<<<<<<< HEAD
    const { timer } = this.state;
    console.log(timer);
=======
>>>>>>> 3e79abf0957e0ecafc2604a8f00e919f791094a5
    const standardPoint = 10;
    const hardPoint = 3;
    const mediumPoint = 2;
    const easyPoint = 1;
    let totalScore;

    switch (difficulty) {
    case 'hard':
      console.log(answerTimer);
      totalScore = (standardPoint + (answerTimer * hardPoint));
      break;
    case 'medium':
      console.log(answerTimer);
      totalScore = (standardPoint + (answerTimer * mediumPoint));
      break;
    case 'easy':
      console.log(answerTimer);
      totalScore = (standardPoint + (answerTimer * easyPoint));
      break;
    default:
      return 0;
    }
    score(Number(totalScore));
  }

  handleAnswerClick = (e) => {
    const { target: { value, name } } = e;
    e.preventDefault();
    console.log(value);
    this.setState({
      correctAlt: 'CorrectAns',
      incorrectAlt: 'IncorrectAns',
    });

    if (value === 'correct') {
      this.setState({ test: true }, async () => {
        const { answerTimer } = this.state;
        await this.calculatePoints(name, answerTimer);
      });
    }
  }

  renderRandomQuestions = (object) => {
    const { isTimeFinished } = this.props;
    const { correctAlt, incorrectAlt } = this.state;
    const correctAnswer = (
      <button
        key="0"
        type="button"
        data-testid="correct-answer"
        value="correct"
        name={ object.difficulty }
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
        value="incorrect"
        type="button"
        data-testid={ `wrong-answer-${i}` }
        disabled={ isTimeFinished }
      >
        { answer }
      </button>));

    const allAnswers = [correctAnswer, ...incorrectAnswers];
    const shuffledArray = this.shuffleArray(allAnswers);
    // return shuffledArray.map((answer) => answer);
    console.log(shuffledArray, 'shuffled array');
    this.setState({ questions: shuffledArray });
  }

  render() {
<<<<<<< HEAD
    const { questions, index, loading, timer } = this.state;
=======
    const { questions, index, loading, test } = this.state;
>>>>>>> 3e79abf0957e0ecafc2604a8f00e919f791094a5
    return (
      <div>
        { loading
          ? <Loading />
          : (
            <>
              <p data-testid="question-category">{questions[index].category}</p>
              <p data-testid="question-text">{questions[index].question}</p>
              <div data-testid="answer-options">
                {/* { this.renderRandomQuestions(questions[index]) } */}
                {/* { question.map((answer) => answer) } */ console.log(questions, 'perguntas')}
                { questions.map((answer) => answer) }
              </div>
<<<<<<< HEAD
              <p>{ timer }</p>
              {/* <Timer getTimer={ this.getTimer } /> */}
=======
              <Timer x={ test } getTimer={ this.getTimer } />
>>>>>>> 3e79abf0957e0ecafc2604a8f00e919f791094a5
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
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  fetch: (token) => dispatch(fetchQuestions(token)),
  score: (score) => dispatch(scoreAction(score)),
  dispatchTimer: () => dispatch(timerFinished()),
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
  score: PropTypes.func.isRequired,
  dispatchTimer: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
