import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
// import Question from '../components/Question';
import { fetchQuestions } from '../redux/actions';

class Quiz extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
    };
  }

  componentDidMount() {
    const { fetch, token, questions } = this.props;
    fetch(token);
    // this.setState({ questions: questions.results });
  }

  render() {
    const { questions } = this.state;
    console.log(questions);
    return (
      <div>
        <Header />
        {/* <Question
          category={ questions[0].category }
          questionText={ questions[0].question }
          correctAnswer={ questions[0].correct_answer }
          wrongAnswer={ questions[0].incorrect_answers[0] }
        /> */}
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

Quiz.propTypes = ({
  fetch: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  questions: PropTypes.objectOf(PropTypes.any).isRequired,
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
