import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchQuestions } from '../redux/actions';
import Loading from './Loading';

class Question extends Component {
  constructor() {
    super();
    console.log('constructor');
    this.state = {
      questions: [],
      index: 0,
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchAux();
    console.log('didmount');
  }

  fetchAux = async () => {
    const { fetch, token } = this.props;
    await fetch(token);
    const { questions } = this.props;
    this.setState({ questions: questions.results, loading: false });
  }

  render() {
    const { questions, index, loading } = this.state;
    console.log(questions);
    return (
      <div>
        { loading
          ? <Loading />
          : (
            <>
              <p data-testid="question-category">{questions[index].category}</p>
              <p data-testid="question-text">{questions[index].question}</p>
              <div data-testid="answer-options">
                <button type="button" data-testid="correct-answer">
                  {questions[index].correct_answer}
                </button>
                { questions[index].incorrect_answers.map((answer, i) => (
                  <button
                    key={ i }
                    type="button"
                    data-testid={ `wrong-answer-${i}` }
                  >
                    { answer }
                  </button>
                )) }
              </div>
            </>
          ) }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
  questions: state.trivia.payload,
});

const mapDispatchToProps = (dispatch) => ({
  fetch: (token) => dispatch(fetchQuestions(token)),
});

Question.propTypes = ({
  fetch: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  questions: PropTypes.objectOf(PropTypes.any).isRequired,
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
