import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { fetchQuestions } from '../redux/actions';

class Quiz extends React.Component {
  constructor() {
    super();
    this.state = {
      question: {},
    };
  }

  componentDidMount() {
    const { fetch, token } = this.props;
    fetch(token);
  }

  render() {
    const { questions } = this.props;
    console.log(questions);
    return (
      <div>
        <Header />
        <div>
          { questions.payload.results.map((quest, index) => (
            <p key={ index }>{ quest }</p>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
  questions: state.trivia,
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
