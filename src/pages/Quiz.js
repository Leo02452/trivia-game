import React, { Component } from 'react';
import Header from '../components/Header';
import Question from '../components/Question';

class Quiz extends Component {
  render() {
    return (
      <div>
        <Header />
        <Question />
      </div>
    );
  }
}

export default Quiz;
